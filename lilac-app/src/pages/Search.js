import React, {useState, useEffect} from "react";
import axios from 'axios';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

const { Search } = Input;


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
</Space></div>
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