import { Col, Row } from "antd";

type Props = {
    Title: string,
    Data: React.ReactNode | string,
    //Icon:
}

function CardSection(prop: Props) {
    const { Title, Data } = prop;

    return <Col className="card-section">
        <Row>
            <p>{Title}</p>
        </Row>
        <Col>
            <h2><strong>₹ {Data}</strong></h2>
        </Col>
    </Col>;
}

export default CardSection;