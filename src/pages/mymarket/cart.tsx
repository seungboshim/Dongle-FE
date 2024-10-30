// /mymarket/cart/pages.tsx
'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import WishlistHeader from '@/components/header/CategoryHeader';
import MyMarketFooterNav from '@/components/navbar/MyMarketFooterNav';
import TabMenu from '@/components/header/TabMenu';
import BoxSvg from '/public/svgs/element/box.svg';
import CheckBoxSvg from '/public/svgs/element/check_box.svg';
import CartItem from '@/components/items/CartItem';
import OrderSummary from '@/components/items/OrderSummary';

interface Item {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
};

const initialItems: Item[] = [
    { id: 1, imageUrl: '/images/Son&Jeon.png', name: '왜저뤠ㅞㅞ~~', price: 34000 },
    { id: 2, imageUrl: '/images/Baek.png', name: '어얼얽--', price: 34000 },
    { id: 3, imageUrl: '/images/An.png', name: '고기가 이븐하게 익지 않아써여', price: 34000 },
    { id: 4, imageUrl: '/images/An.png', name: '보류입니다.', price: 34000 },
    { id: 5, imageUrl: '/images/An.png', name: '저는 채소의 익힘 정도를 굉장히 중요시 여기거덩여', price: 34000 },
    { id: 6, imageUrl: '/images/Baek.png', name: '이거 빠쓰자나~ 어허~ 재밌네 이거ㅎㅎ', price: 34000 },
    { id: 7, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
    { id: 8, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
    { id: 9, imageUrl: '/images/product1.png', name: '도치빌 리더스', price: 34000 },
    { id: 10, imageUrl: '/images/product1.png', name: '도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스도치빌 리더스', price: 34000 }
];

const ChoiceDelete = styled.div`
    display: flex;
    height: 48px;
    background-color: white;
    padding: 12px 16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    cursor: pointer;
`;

const CheckBoxContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
`;

const TotalChoiceText = styled.span`
    font-family: 'Pretendard';
    font-size: 12px;
    color: black;
    text-align: center;
`;

const DeleteText = styled.span`
    font-family: 'Pretendard';
    font-size: 12px;
    color: #545454;
    text-align: center;
`;

interface SelectedItems {
    [key: number]: boolean;
}

export default function Home() {
    const [items, setItems] = useState<Item[]>(initialItems);
    const [selectedItems, setSelectedItems] = useState<SelectedItems>({});
    const [selectAll, setSelectAll] = useState(true);

    useEffect(() => {
        const initialSelectedItems: SelectedItems = {};
        items.forEach(item => {
            initialSelectedItems[item.id] = true;
        });
        setSelectedItems(initialSelectedItems);
    }, []);

    const toggleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        const newSelectedItems: SelectedItems = {};
        items.forEach(item => {
            newSelectedItems[item.id] = newSelectAll;
        });
        setSelectedItems(newSelectedItems);
    };

    const toggleItemSelection = (id: number) => {
        const newSelectedItems = { ...selectedItems, [id]: !selectedItems[id] };
        setSelectedItems(newSelectedItems);
        setSelectAll(Object.values(newSelectedItems).every(status => status));
    };

    const removeItem = (id: number) => {
        const newItems = items.filter(item => item.id !== id);
        setSelectedItems(prevState => {
            const newState = { ...prevState };
            delete newState[id];
            return newState;
        });
        setItems(newItems);
    };

    const removeSelectedItems = () => {
        const newItems = items.filter(item => !selectedItems[item.id]);
        setItems(newItems);
        setSelectedItems({});
    };

    const itemCount = Object.values(selectedItems).filter(Boolean).length;

    const totalPrice = items.reduce((total, item) => total + (selectedItems[item.id] ? item.price : 0), 0);

    return (
        <div className="page">
            <WishlistHeader />
            <div className='content' style={{ paddingBottom: '163px' }}>
                <TabMenu />
                <ChoiceDelete onClick={toggleSelectAll}>
                    <CheckBoxContainer>
                        {selectAll ? <CheckBoxSvg /> : <BoxSvg />}
                        <TotalChoiceText>전체선택</TotalChoiceText>
                    </CheckBoxContainer>
                    <DeleteText onClick={removeSelectedItems}>선택 삭제</DeleteText>
                </ChoiceDelete>
                {items.map(item => (
                    <CartItem key={item.id} item={item} selected={selectedItems[item.id]} toggleSelection={() => toggleItemSelection(item.id)} removeItem={() => removeItem(item.id)} />
                ))}
            </div>
            {itemCount > 0 && <OrderSummary itemCount={itemCount} totalPrice={totalPrice} />}
            <MyMarketFooterNav />
        </div>
    );
}