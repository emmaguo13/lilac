import React from 'react';

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
      <button
        type="link"
        onClick={() =>
          window.open(
            `${process.env.REACT_APP_SERVER_URL}/api/deed/pdf?deedId=${deed.deedId}`,
            '_blank'
          )
        }
      >
        Get PDF
      </button>
      {admin ? (
        <div>
          <button onClick={onConfirm} disabled={deed.status != 'P'}>
            {deed.status == 'P' ? 'Confirm' : 'Confirmed'}
          </button>
          <button onClick={onDeny} disabled={deed.status != 'P'}>
            Deny
          </button>
        </div>
      ) : (
        <div style={{ width: '7vw', textAlign: 'center' }}>{statusWord[deed.status]}</div>
      )}
      <button type="link" onClick={onClick}>
        More Details
      </button>
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
