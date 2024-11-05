// HistoryItem.tsx
'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import SelectPets from './SelectPets';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderCancelModal from './OrderCancelModal';
import XxsmallSvg from '/public/svgs/element/x_xsmall.svg';

const HistoryItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  padding: 16px 0;
  background-color: #FFFFFF;
  border-bottom: 1px solid #D9D9D9;

  &:last-child {
    border-bottom: none;
  }
`;

const Image = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 16px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  max-width: 468px;
  width: 100%;
`;

const Info = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
`;
const Info2 = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
`;

const Name = styled.div`
    font-size: 16px;
    overflow: hidden;
    flex-grow: 1;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
`;

const OrderCancel = styled.div`
  font-size: 12px;
  color: #D9D9D9;
  cursor: pointer;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const BarText = styled.div`
    font-size: 16px;
    color: #D9D9D9;
`;

const AmountWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const Amount = styled.div`
    font-size: 14px;
    color: #919191;
`;

const CartButton = styled.button`
  background-color: #F1F1F1;
  font-family: "Pretendard";
  font-size: 12px;
  color: #5E5E5E;
  text-decoration: none;
  border-radius: 30px;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
`;

interface HistoryItemProps {
    imageUrl: string;
    name: string;
    price: number;
    orderDate: string;
    cartItems: { name: string; price: number; }[];
    selectedPetIds: number[];
    amount: number;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ imageUrl, name, price, orderDate, cartItems, selectedPetIds, amount }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOrderCancelClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleOrderCancel = () => {
        console.log("주문취소 처리");
        setShowModal(false);
        toast(<ToastOrderCancelComplete />, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
                marginTop: '82px',
                marginRight: '16px',
                marginLeft: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '16px',
            }
        });
    };

    const ToastOrderCancelComplete = () => {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                color: 'white',
                fontSize: '14px'
            }}>
                <span>주문취소가 완료되었습니다.</span>
            </div>
        );
    };

    const isItemInCart = () => {
        return cartItems.some(item => item.name === name && item.price === price);
    };

    const ToastContent = () => {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                color: 'white',
                fontSize: '12px'
            }}>
                <span>장바구니에 상품을 담았습니다.</span>
                <Link href="/mymarket/cart" style={{ color: 'white' }}>바로가기</Link>
            </div>
        );
    };

    const ToastContentAlreadyInCart = () => {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                color: 'white',
                fontSize: '12px'
            }}>
                <span>이미 장바구니에 있는 상품입니다.</span>
                <Link href="/mymarket/cart" style={{ color: 'white' }}>바로가기</Link>
            </div>
        );
    };

    const handleAddToCart = () => {
        if (isItemInCart()) {
            toast(<ToastContentAlreadyInCart />, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: {
                    marginBottom: '82px',
                    marginRight: '16px',
                    marginLeft: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                }
            });
        } else {
            toast(<ToastContent />, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: {
                    marginBottom: '82px',
                    marginRight: '16px',
                    marginLeft: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                }
            });
        }
    };

    return (
        <HistoryItemContainer>
            <Image src={imageUrl} alt={name} />
            <InfoContainer>
                <Info>
                    <Name>{name}</Name>
                    <OrderCancel onClick={handleOrderCancelClick}>주문취소</OrderCancel>
                    {showModal && <OrderCancelModal onClose={handleClose} onOrderCancel={handleOrderCancel} />}
                </Info>
                <Info2>
                    <Price>{price.toLocaleString()} 원</Price>
                    <BarText>|</BarText>
                    <AmountWrapper>
                        <Amount>{amount}개</Amount>
                    </AmountWrapper>
                </Info2>
                <Info>
                    <SelectPets selectedPetIds={selectedPetIds} isInteractive={false} />
                    <CartButton onClick={handleAddToCart}>장바구니 담기</CartButton>
                </Info>
            </InfoContainer>
        </HistoryItemContainer>
    );
};

export default HistoryItem;