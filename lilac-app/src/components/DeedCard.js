import React from 'react';
import { Button } from 'antd';
import axios from 'axios';

const DeedCard = (props) => {
  const { admin, deed, onClick, onConfirm, onDeny } = props;

  return (
    <div
      key={deed.deedId}
      style={{
        width: '60vw',
        height: '4vw',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: '1.5vw',
        borderRadius: '4vw',
        padding: '0 2vw 0 2vw',
      }}
    >
      <div>{deed.deedId}</div>
      <div style={{ width: '15vw', textAlign: 'center' }}>{deed.name}</div>
      <Button
        type="link"
        onClick={() =>
          window.open(
            `${process.env.REACT_APP_SERVER_URL}/api/deed/pdf?deedId=${deed.deedId}`,
            '_blank'
          )
        }
      >
        Get PDF
      </Button>
      {admin ? (
        <div>
          <Button onClick={onConfirm} disabled={deed.status != 'P'}>
            {deed.status == 'P' ? 'Confirm' : 'Confirmed'}
          </Button>
          <Button onClick={onDeny} disabled={deed.status != 'P'}>
            Deny
          </Button>
        </div>
      ) : (
        <div style={{ width: '7vw', textAlign: 'center' }}>{statusWord[deed.status]}</div>
      )}
      <Button type="link" onClick={onClick}>
        More Details
      </Button>
    </div>
  );
};

const statusWord = {
  P: 'Pending',
  C: 'Confirmed',
  D: 'Disputed',
  R: 'Rejected',
};

export default DeedCard;
