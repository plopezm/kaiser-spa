import React from 'react';
import { Card } from 'antd';
import { Meta } from 'antd/lib/list/Item';

const ImageCard = (props) => {
    return (
        <Card
            hoverable
            style={{ width: 250, marginTop: 10 }}
            cover={props.image}
            >
            <hr style={{marginTop: 0}} />
            <Meta
                title={props.title}
                description={props.desc}
            />
        </Card>
    );
}

export default ImageCard;
