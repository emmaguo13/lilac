import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AudioOutlined } from '@ant-design/icons';
import { Button, Tabs, Input, Upload, message, Card, Col, Row, Space } from 'antd';
import { navigate } from '@reach/router';

const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

function SearchBar() {
    const [events, setEvents] = useState([]);

    const onSearch = async (value) => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}api/user/searchUserData`,
                {
                    params: { name: value, ens: value },
                }
            );
            console.log(data);
            setEvents(data.users);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div
                style={{
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',

                    marginTop: '5vh',
                }}
            >
                <Search
                    placeholder="Search by ens or name"
                    onSearch={onSearch}
                    enterButton
                    size="large"
                    style={{ width: '50vw' }}
                />
                <div
                    className="site-card-wrapper"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                        width: '70vw',
                        backgroundColor: '#FFDDFF',
                        alignItems: 'center',
                        marginTop: '3vh',
                    }}
                >
                    {events.map((event) => (
                        <Card
                            title={event.name}
                            bordered={false}
                            style={{ margin: '20px' }}
                            onClick={() => navigate(`/account/${event.address}`)}
                        >
                            <p>{event.github}</p>
                            <p>Reputation: {event.score}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SearchBar;

// const App = () => (
// );

// export default App;
// import {Input} from 'antd';

// function Search() {
//     return (
//         <Input placeholder="Basic usage" />
//     )
// }

// export default Search;

// import { AudioOutlined } from '@ant-design/icons';
// import { Input, Space } from 'antd';
// const { Search } = Input;
// const suffix = (
//   <AudioOutlined
//     style={{
//       fontSize: 16,
//       color: '#1890ff',
//     }}
//   />
// );

// const onSearch = (value) => console.log(value);

// const App = () => (
//   <Space direction="vertical">
//     <Search
//       placeholder="input search text"
//       onSearch={onSearch}
//       style={{
//         width: 200,
//       }}
//     />
//     <Search
//       placeholder="input search text"
//       allowClear
//       onSearch={onSearch}
//       style={{
//         width: 200,
//       }}
//     />
//     <Search
//       addonBefore="https://"
//       placeholder="input search text"
//       allowClear
//       onSearch={onSearch}
//       style={{
//         width: 304,
//       }}
//     />
//     <Search placeholder="input search text" onSearch={onSearch} enterButton />
//     <Search
//       placeholder="input search text"
//       allowClear
//       enterButton="Search"
//       size="large"
//       onSearch={onSearch}
//     />
//     <Search
//       placeholder="input search text"
//       enterButton="Search"
//       size="large"
//       suffix={suffix}
//       onSearch={onSearch}
//     />
//   </Space>
// );

// export default App;
// import {Input} from 'antd';

// function Search() {
//     return (
//         <Input placeholder="Basic usage" />
//     )
// }

// export default Search;

// import { AudioOutlined } from '@ant-design/icons';
// import { Input, Space } from 'antd';
// const { Search } = Input;
// const suffix = (
//   <AudioOutlined
//     style={{
//       fontSize: 16,
//       color: '#1890ff',
//     }}
//   />
// );

// const onSearch = (value) => console.log(value);

// const App = () => (
//   <Space direction="vertical">
//     <Search
//       placeholder="input search text"
//       onSearch={onSearch}
//       style={{
//         width: 200,
//       }}
//     />
//     <Search
//       placeholder="input search text"
//       allowClear
//       onSearch={onSearch}
//       style={{
//         width: 200,
//       }}
//     />
//     <Search
//       addonBefore="https://"
//       placeholder="input search text"
//       allowClear
//       onSearch={onSearch}
//       style={{
//         width: 304,
//       }}
//     />
//     <Search placeholder="input search text" onSearch={onSearch} enterButton />
//     <Search
//       placeholder="input search text"
//       allowClear
//       enterButton="Search"
//       size="large"
//       onSearch={onSearch}
//     />
//     <Search
//       placeholder="input search text"
//       enterButton="Search"
//       size="large"
//       suffix={suffix}
//       onSearch={onSearch}
//     />
//   </Space>
// );

// export default App;%
