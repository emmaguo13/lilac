import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DeedCard from '../components/DeedCard';
import { navigate } from '@reach/router';

function Account() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [profileID, setProfileID] = useState("");

  //end
  
  const { current: a } = useRef(['a']);
  useEffect(() => {
      setLoading(false);
  });

  getPublications = async () => {
    if (!profileID) {
      throw new Error('Must have profile to run this');
    }
    const result = await getPublications({
      profileId,
      publicationTypes: ['POST', 'COMMENT', 'MIRROR'],
    });
  
    return result.data;
  };


  const profile = async (request) => {
  
    // TODO: get profile ID from frontend passed in, or through mongo
  
    if (!request) {
      request = { profileId };
    }
  
    const profile = await getProfile(request);
  
    return profile.data;
  };

const createPost = async () => {

  
    const ipfsResult = await uploadIpfs<Metadata>({
      version: '1.0.0',
      metadata_id: uuidv4(),
      description: 'Description',
      content: 'Content',
      external_url: null,
      image: null,
      imageMimeType: null,
      name: 'Name',
      attributes: [],
      media: [
        // {
        //   item: 'https://scx2.b-cdn.net/gfx/news/hires/2018/lion.jpg',
        //   // item: 'https://assets-global.website-files.com/5c38aa850637d1e7198ea850/5f4e173f16b537984687e39e_AAVE%20ARTICLE%20website%20main%201600x800.png',
        //   type: 'image/jpeg',
        // },
      ],
      appId: 'testing123',
    });
    console.log('create post: ipfs result', ipfsResult);
  
    // hard coded to make the code example clear
    const createPostRequest = {
      profileId,
      contentURI: 'ipfs://' + ipfsResult.path,
      collectModule: {
        // feeCollectModule: {
        //   amount: {
        //     currency: currencies.enabledModuleCurrencies.map(
        //       (c: any) => c.address
        //     )[0],
        //     value: '0.000001',
        //   },
        //   recipient: address,
        //   referralFee: 10.5,
        // },
        // revertCollectModule: true,
        freeCollectModule: { followerOnly: true },
        // limitedFeeCollectModule: {
        //   amount: {
        //     currency: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
        //     value: '2',
        //   },
        //   collectLimit: '20000',
        //   recipient: '0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3',
        //   referralFee: 0,
        // },
      },
      referenceModule: {
        followerOnlyReferenceModule: false,
      },
    };
  
    const result = await createPostTypedData(createPostRequest);
    console.log('create post: createPostTypedData', result);
  
    const typedData = result.data.createPostTypedData.typedData;
    console.log('create post: typedData', typedData);
  
    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
    console.log('create post: signature', signature);
  
    const { v, r, s } = splitSignature(signature);
  
    const tx = await lensHub.postWithSig({
      profileId: typedData.value.profileId,
      contentURI: typedData.value.contentURI,
      collectModule: typedData.value.collectModule,
      collectModuleInitData: typedData.value.collectModuleInitData,
      referenceModule: typedData.value.referenceModule,
      referenceModuleInitData: typedData.value.referenceModuleInitData,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    });
    console.log('create post: tx hash', tx.hash);
  
    console.log('create post: poll until indexed');
    const indexedResult = await pollUntilIndexed(tx.hash);
  
    console.log('create post: profile has been indexed', result);
  
    const logs = indexedResult.txReceipt.logs;
  
    console.log('create post: logs', logs);
  
    const topicId = utils.id(
      'PostCreated(uint256,uint256,string,address,bytes,address,bytes,uint256)'
    );
    console.log('topicid we care about', topicId);
  
    const profileCreatedLog = logs.find((l: any) => l.topics[0] === topicId);
    console.log('create post: created log', profileCreatedLog);
  
    let profileCreatedEventLog = profileCreatedLog.topics;
    console.log('create post: created event logs', profileCreatedEventLog);
  
    const publicationId = utils.defaultAbiCoder.decode(['uint256'], profileCreatedEventLog[2])[0];
  
    console.log('create post: contract publication id', BigNumber.from(publicationId).toHexString());
    console.log(
      'create post: internal publication id',
      profileId + '-' + BigNumber.from(publicationId).toHexString()
    );
  
    return result.data;
  };
  



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
          <h1>Your Posts</h1>
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
