import React, { useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
    useEffect(() => {
        window.addEventListener('message', messageHandler);

        return () => {
            window.removeEventListener('message', messageHandler);
        };
    }, []);

    const messageHandler = (event) => {
        document.querySelector('#message').innerText = typeof event.data === 'string' ? event.data : JSON.stringify(event.data);
        if (event?.data?.type === 'function' && typeof event?.data?.params !== 'undefined') {
            onFetch(event?.data?.params);
        }
    };

    const onChangeCheckBox = (e) => {
        const checked = e.target.checked;
        window.parent.postMessage({ checked, id: 'HD88888', link: 'http://localhost:8080/' }, '*');
    };

    const onLinkClick = (link) => {
        window.parent.postMessage({ type: 'link', link }, '*');
    };

    const onFetch = (params) => {
        console.log('call api with params:', params);
    };

    return (
        <>
            <Head>
                <title>Iframe App</title>
                <meta name='description' content='Generated by create next app' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='box'>
                <div className='pt-4px'>
                    <input type='checkbox' id='isChecked' className='checkbox' onChange={onChangeCheckBox} />
                </div>
                <div>
                    <label htmlFor='isChecked'>
                        <img src='logo.png' alt='' />
                        Tôi đề nghị HDBank và HD SAISON truy vấn thông tin & Tài khoản thanh toán (TKTT) của tôi tại HDBank (nếu có). Tôi đề nghị mở TKTT
                        eSkyOne HDBank và cam kết:
                    </label>

                    <ul>
                        <li className='mt-16px'>
                            Đọc và đồng ý với{' '}
                            <span onClick={() => onLinkClick('đề nghị kiêm hợp đồng mở và sử dụng TKTT, dịch vụ eBanking, HDBank Loyalty')}>
                                Đề nghị kiêm hợp đồng mở và sử dụng TKTT, dịch vụ eBanking, HDBank Loyalty
                            </span>{' '}
                            và <span onClick={() => onLinkClick('điều khoản, điều kiện')}>Điều khoản, điều kiện.</span>
                        </li>
                        <li className='mt-16px'>
                            Không có <span onClick={() => onLinkClick('dấu hiệu Hoa Kỳ')}>Dấu hiệu Hoa Kỳ</span> và đồng ý cho HD SAISON cung cấp thông tin của
                            tôi cho HDBank để mở TKTT.
                        </li>
                    </ul>
                </div>
            </div>
            <h3>The message from the parent appears below:</h3>
            <div className='code'>
                <code id='message'>Please send some message from the input above.</code>
            </div>
        </>
    );
}