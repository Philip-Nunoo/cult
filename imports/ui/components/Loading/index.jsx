import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const LoadingContainer = styled.div`
    text-align: center;
    padding: 30px 50px;
    margin: 80px 0;
`;

const Loading = () => (
    <LoadingContainer>
        <Spin />
    </LoadingContainer>
);

export default Loading;
