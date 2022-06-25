import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DeedCard from '../components/DeedCard';
import { navigate } from '@reach/router';

function UserStatus() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //end
  const publicAddress = '0x20E43CAdC9961eDfc61170EeeF66d571C5993DFC'; // Dummy value for now

  const { current: a } = useRef(['a']);
  useEffect(() => {
      setLoading(false);
  });

  return (
    <>
      <div style={{ padding: '5vw', backgroundColor: '#FFFFFF' }}>
        <div
          style={{
            width: '90vw',
            height: '90vh',
            backgroundColor: 'rgba(73, 194, 104, 0.42)',
            borderTopLeftRadius: '2vw',
            borderTopRightRadius: '2vw',
            padding: '3vh 5vw 3vh 5vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1>Your Deeds</h1>
          {loading ? (
            <div> Loading </div>
          ) : (
            data.map((deed, index) => (
              <DeedCard deed={deed} onClick={() => navigate(`/deed/${deed.deedId}`)} />
            ))
          )}
        </div>
      </div>
    </>
  );

  // const columns = [
  //     {
  //         title: 'FormID',
  //         dataIndex: 'FormID',
  //         key: 'FormID',
  //         // render: (text) => <a>{text}</a>,
  //     },
  //     {
  //         title: 'Public Address',
  //         dataIndex: 'PublicAddress',
  //         key: 'PublicAddress',
  //         // render: (text) => <a>{text}</a>,
  //     },
  //     {
  //         title: 'Coordinates',
  //         dataIndex: 'Coordinates',
  //         key: 'Coordinates',
  //         // render: (text) => <a>{text}</a>,
  //     },
  //     {
  //         title: 'Date',
  //         dataIndex: 'Date',
  //         key: 'Date',
  //     },

  //     {
  //         title: 'Tag',
  //         key: 'Tag',
  //         dataIndex: 'Tag',
  //         render: (tags) => (
  //             <>
  //                 {tags.map((tag) => {
  //                     let color = 'yellow';
  //                     if (tag === 'APPROVED') {
  //                         color = 'green';
  //                     } else if (tag === 'REJECTED') {
  //                         color = 'red';
  //                     }
  //                     return (
  //                         <Tag color={color} key={tag}>
  //                             {tag.toUpperCase()}
  //                         </Tag>
  //                     );
  //                 })}
  //             </>
  //         ),
  //     },
  // ];
}

export default UserStatus;
