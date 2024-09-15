import { Form, Drawer, Button, Input, Select, Space } from "antd";
import { Expense } from "@/types";

type Props = {
    openDrawer: boolean,
    onFinish: (e:Expense) => void,
    toggleDrawer: () => void
}

function AddExpenseDrawer(prop: Props) {
    const { openDrawer, onFinish, toggleDrawer } = prop;
    return <Drawer
        maskClosable={false}
        closable
        destroyOnClose
        title={<h3>Add Expense</h3>}
        placement="right"
        open={openDrawer}
        onClose={toggleDrawer}
        size={"large"}
    >
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
        >
            <Form.Item<string>
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Title Required' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<number> label="Category" name="category" initialValue={1}>
                <Select
                    key={"category"}
                    options={[
                        { value: 1, label: 'Food', },
                        { value: 2, label: 'Shopping' },
                        { value: 3, label: 'Bills' },
                        { value: 4, label: 'Entertainment' },
                    ]}
                />
            </Form.Item>
            <Form.Item<number>
                label="Amount"
                name="amount"
                rules={[{ required: false }]}
            >
                <Input type="number" />
            </Form.Item>
            <div className="form-btn">
                <Form.Item wrapperCol={{ offset: 16, span: 14 }}>
                    <Space size={"middle"}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>

                        <Button onClick={toggleDrawer}>
                            cancel
                        </Button>
                    </Space>
                </Form.Item>
            </div>
        </Form>
    </Drawer>
}

export default AddExpenseDrawer;