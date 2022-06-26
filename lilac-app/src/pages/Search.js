import React, {useState, useEffect} from "react";
import axios from 'axios';
import { AudioOutlined } from '@ant-design/icons';
import { Button, Tabs, Input, Upload, message, Card, Col, Row, Space } from 'antd';

const { Search } = Input;

function capitalize(str) {
    return str[0].toUpperCase() + str.substring(1);
}

const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

const onSearch = (value) => console.log(value);

  
function SearchBar() {

    const [events, setEvents] = useState([]);
    return (
        <>
        <div
        style={{
            width: '100vw',
            position: 'absolute',
            display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',            
        }}
        >
        <Space direction="vertical">
            <Search placeholder="input search text" onSearch={onSearch} enterButton />
        </Space>
        </div>
        <div
        className="site-card-wrapper"
        style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            width: '70vw',
            backgroundColor: '#FFDDFF',
        }}
        >
            {/* {events.map((event) => (
                <Card title={capitalize(event.type)} bordered={false}>
                    <p>{capitalize(event.protocol)}</p>
                    <p>Reputation Points: {event.magnitude}</p>
                </Card>
            ))} */}
            <Card title={"Deven"} bordered={false}>
                <p>{capitalize("dydx")}</p>
                <p>Reputation Points: {50000}</p>
            </Card>
        </div>
        
        </>
    )
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