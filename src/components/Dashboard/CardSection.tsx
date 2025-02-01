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
        <Row>
            <h2><strong><span>₹</span>{Data}</strong></h2>
        </Row>
    </Col>;
}

export default CardSection;