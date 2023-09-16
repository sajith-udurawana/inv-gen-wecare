import moment from "moment";
import React, { createRef, useState } from "react";
import { Spreadsheet } from "react-spreadsheet";
import ReactToPrint from "react-to-print";

const currencyFormat = Intl.NumberFormat("en-LK", {
  currency: "LKR",
  style: "currency",
});

function generateRandomInvoiceNumber() {
  const timestamp = moment().format("X");

  const random1 = Math.floor(Math.random() * 10000);
  const random2 = Math.floor(Math.random() * 1000);
  const random3 = Math.floor(Math.random() * 100);

  const invoiceNumber = `#${random1.toString().padStart(4, "0")}-${random2
    .toString()
    .padStart(3, "0")}-${random3.toString().padStart(2, "0")}`;

  return invoiceNumber;
}

import {
  Button,
  Col,
  Container,
  Content,
  Divider,
  Form,
  Grid,
  Navbar,
  Panel,
  Row,
  Stack,
  Table,
} from "rsuite";

export default function Editor() {
  const [formValue, setFormValue] = useState({
    invoice_no: generateRandomInvoiceNumber(),
    note: "Thank you for using our platform.",
  });
  const [invoiceItems, setInvoiceItems] = useState([
    [{ value: "WeCare Session - Individual" }, { value: 1 }, { value: 4000 }],
  ]);
  const invoicedItems = invoiceItems.map((item) => {
    return {
      item: item[0].value,
      qty: item[1].value,
      unit_price: item[2].value,
      amount: item[1].value * item[2].value,
    };
  });
  let total = 0;
  invoicedItems.forEach((item) => {
    total += item["amount"];
  });
  const printRef = createRef();
  return (
    <React.Fragment>
      <Navbar>
        <Navbar.Brand style={{ fontWeight: "bold" }}>
          Invoice Generator
        </Navbar.Brand>
      </Navbar>
      <Container style={{ padding: "1rem" }}>
        <Content>
          <Grid fluid>
            <Row>
              <Col xs={24} lg={12}>
                <Form onChange={setFormValue} formValue={formValue}>
                  <Form.Group>
                    <Form.ControlLabel>Customer name</Form.ControlLabel>
                    <Form.Control name="customer" type="text" />
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel>Address</Form.ControlLabel>
                    <Form.Control name="address" type="address" />
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel>Date</Form.ControlLabel>
                    <Form.Control name="date" type="date" />
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel>Date</Form.ControlLabel>
                    <Form.Control name="note" type="text" />
                  </Form.Group>
                  <Stack
                    spacing={16}
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ marginBottom: "1rem" }}
                  >
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                    >
                      Items
                    </div>
                    <Stack spacing={16}>
                      <Button
                        onClick={() => {
                          const items = [...invoiceItems];
                          items.pop();
                          setInvoiceItems(items);
                        }}
                        disabled={invoiceItems.length <= 1}
                      >
                        Remove Item
                      </Button>
                      <Button
                        onClick={() => {
                          console.log(invoiceItems);
                          setInvoiceItems([
                            ...invoiceItems,
                            [{ value: "" }, { value: 1 }, { value: 0 }],
                          ]);
                        }}
                      >
                        Add Item
                      </Button>
                    </Stack>
                  </Stack>
                  <Spreadsheet
                    data={invoiceItems}
                    hideRowIndicators
                    onChange={(value) => {
                      setInvoiceItems(value);
                    }}
                    columnLabels={["Item", "Qty", "Amount"]}
                  />
                  <Divider />
                  <ReactToPrint
                    trigger={() => (
                      <Button color="blue" appearance="primary" size="lg">
                        Print
                      </Button>
                    )}
                    content={() => printRef.current}
                  />
                </Form>
              </Col>
              <Col xs={24} lg={12}>
                <div style={{ color: "gray", marginBottom: "1rem" }}>
                  Preview
                </div>
                <Panel bordered shaded style={{ minWidth: "640px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    ref={printRef}
                  >
                    <Panel
                      style={{ minWidth: "640px" }}
                      header={
                        <div style={{ paddingTop: "1rem" }}>
                          <Stack spacing={16} alignItems="flex-start">
                            <Stack.Item grow={1}>
                              <div
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "2rem",
                                  color: "#36ae7c",
                                }}
                              >
                                INVOICE
                              </div>
                              <div>
                                <strong>WeCare Solutions (PVT) Ltd.</strong>
                              </div>
                              <div
                                style={{ fontSize: "0.9rem", color: "gray" }}
                              >
                                863/2, Robert Gunawardane Mawatha, Thalangama
                                North, Malabe
                              </div>
                            </Stack.Item>
                            <Stack.Item grow={1}>
                              <div
                                style={{ textAlign: "end", color: "#36ae7c" }}
                              >
                                {moment(formValue["date"]).format("MM/DD/YYYY")}
                              </div>
                              <div
                                style={{ textAlign: "end", color: "#36ae7c" }}
                              >
                                {formValue["invoice_no"]}
                              </div>
                            </Stack.Item>
                          </Stack>
                          <Divider />
                        </div>
                      }
                    >
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          marginBottom: "0.5rem",
                          color: "#36ae7c",
                        }}
                      >
                        Billing information
                      </div>
                      <div>{formValue.customer ?? "N/A"}</div>
                      <div>{formValue.address ?? "N/A"}</div>
                      <Divider />
                      <Table autoHeight data={invoicedItems} virtualized>
                        <Table.Column flexGrow={2}>
                          <Table.HeaderCell>Item</Table.HeaderCell>
                          <Table.Cell dataKey="item" />
                        </Table.Column>
                        <Table.Column flexGrow={1}>
                          <Table.HeaderCell align="center">
                            Qty
                          </Table.HeaderCell>
                          <Table.Cell dataKey="qty" align="center" />
                        </Table.Column>
                        <Table.Column flexGrow={1}>
                          <Table.HeaderCell align="center">
                            Unit price
                          </Table.HeaderCell>
                          <Table.Cell dataKey="unit_price" align="center" />
                        </Table.Column>
                        <Table.Column flexGrow={1}>
                          <Table.HeaderCell align="right">
                            Amount
                          </Table.HeaderCell>
                          <Table.Cell align="right">
                            {(rowData) =>
                              currencyFormat.format(rowData["amount"])
                            }
                          </Table.Cell>
                        </Table.Column>
                      </Table>
                      <Divider />
                      <Stack style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                        <Stack.Item grow={1}>Total</Stack.Item>
                        <Stack.Item alignSelf="flex-end">
                          {currencyFormat.format(total)}
                        </Stack.Item>
                      </Stack>
                      <Divider />
                      <Stack>
                        <Stack.Item grow={1}>
                          <em>{formValue["note"]}</em>
                        </Stack.Item>
                        <Stack.Item>
                          <img src="stamp.webp" width={256} />
                        </Stack.Item>
                      </Stack>
                      <Divider />
                      <div style={{ textAlign: "center" }}>
                        <div>
                          <strong
                            style={{ color: "#36ae7c", fontSize: "1.2rem" }}
                          >
                            WeCare Solutions (PVT) Ltd.
                          </strong>
                        </div>
                        <div>
                          863/2, Robert Gunawardane Mawatha, Thalangama North,
                          Malabe
                        </div>
                        <div>
                          wecareonline.lk (+94759909062, hello@wecareonline.lk)
                        </div>
                      </div>
                    </Panel>
                  </div>
                </Panel>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    </React.Fragment>
  );
}
