import React, { useState, useEffect } from 'react'
import { Button, Layout, Col, Card, Row, List, Typography, Input } from 'antd'
const { Header, Footer, Content } = Layout
const { Title } = Typography

export const AllOrders = () => {
  const [orders, setOrders] = useState([])
  const [orderItems, setOrderItems] = useState([])
  const [showMore, setShowMore] = useState({ status: false, showAddress: false})
  const [selectedItem, setSelectedItem] = useState([])
  const [addressValue, setValue] = useState('')

  const fetchData = () => {
    const ordersData = fetch('http://localhost:3000/orders')
    const orderItems = fetch('http://localhost:3000/orderitems')

    Promise.all([ordersData, orderItems])
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => {
        const [order, item] = data
        //console.log(order, item)
        let result = order.map((o, index) => {
          if (o.id === item[index].id) {
            return {
              ...o,
              quantity: item[index].quantity
            }
          }
          return o
        })
        setOrders(result)
        setOrderItems(item)
      })
      .catch(error => console.log(error))
  }

  const changeAddress = (id) => {
    let result = orders.map(order => {
      if (order.id === id) {
        return {
          ...order,
          address: addressValue
        }
      }
      return order
    })
    setOrders(result)
  }

  const showDetails = (id) => {
    const selectedItem = orderItems.filter(item => item.orderId === id)
    const editAddress = orders.find(item => item.id === id && item.status !== 'shipped')
    if (!editAddress) {
      setShowMore({ status: true, showAddress: false })
    } else {
      setShowMore({ status: true, showAddress: true })
      setValue(editAddress.address)
    }
    setSelectedItem(selectedItem)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Layout>
      <Header />
      <Content>
        <Row>
          <Col span={12}>
            <Row gutter={8}>
              {orders.map(order => (
                <Col key={order.id}>
                  <Card
                    style={{ width: 300 }}
                  >
                    <Typography.Text type="secondary">Order Id: {order.id}</Typography.Text>
                    <Title level={5}>Total: {order.total}</Title>
                    <Title level={5}>Status: {order.status}</Title>
                    <Title level={5}>Quantity: {order.quantity}</Title>
                    <Button type="primary" onClick={() => showDetails(order.id)}>More Details</Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col span={12}>
            {showMore.status && (
              <List
                header={<div>Order Details</div>}
                bordered
                dataSource={selectedItem}
                renderItem={item => (
                  <List.Item>
                    <Typography.Text mark>Order Id</Typography.Text> {item.orderId}<br/ >
                    <Typography.Text mark>Price</Typography.Text> {item.itemPrice}<br/ >
                    <Typography.Text mark>Quantity</Typography.Text> {item.quantity}<br />
                    {showMore.showAddress && (
                      <>
                        <Input style={{ margin: '.5rem'}} name="address" value={addressValue} onChange={(e) => setValue(e.target.value)} />
                        <Button type="primary" onClick={() => changeAddress(item.orderId)}>Save</Button>
                      </>
                    )}
                  </List.Item>
                )}
              />
            )}
          </Col>
        </Row>
      </Content>
      <Footer />
    </Layout>
  )
}
