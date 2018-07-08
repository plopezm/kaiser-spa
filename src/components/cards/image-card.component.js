import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { Meta } from 'antd/lib/list/Item';

const ImageCard = (props) => {
    return (
        <Card onClick={props.onClick}
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

ImageCard.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    image: PropTypes.element,
    onClick: PropTypes.func
}

ImageCard.defaultProps = {
    onClick: () => {}
};

export default ImageCard;
