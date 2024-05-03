"use client"
import { ChangeEvent, useEffect, useState } from 'react';
import { PromotionalCouponService } from '@/services/PromotionalCouponService';
import { PromotionalCoupon } from '@/models/PromotionalCoupon';


const CouponList: React.FC = () => {
    const [coupons, setCoupons] = useState<PromotionalCoupon[]>([]);
    const [coupon, setCoupon] = useState<PromotionalCoupon>(new PromotionalCoupon({}));
    const promotionalCouponService = new PromotionalCouponService();

    useEffect(() => {
        fetchPromotionalCoupons();
    }, []);

    const handleAddCoupon = async () => {
        try {
            validateCoupon();
            await promotionalCouponService.save(coupon);
            alert("Coupon added successfully!");
            fetchPromotionalCoupons();
        } catch (error) {
            alert(`Error adding promotional coupon. ${error}`);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        setCoupon(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    };
    const handleDeleteCoupon = async (id: number) => {
        try {
            await promotionalCouponService.delete(id);
            alert("Coupon deleted successfully!");
            fetchPromotionalCoupons();
        } catch (error) {
            alert(`Error adding promotional coupon. ${error}`);
        }
    };

    const validateCoupon = () => {
        if (!coupon.name) {
            throw new Error('Coupon name are required');
        }
        if (!coupon.value) {
            throw new Error('Coupon value are required');
        }
    };

    const fetchPromotionalCoupons = async () => {
        const response = await promotionalCouponService.findAll();
        setCoupons(response.data);
    }

    return (
        <div className="max-w-full mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4 flex justify-center items-center">Lista de Cupons</h1>
            <div className="flex mb-4 justify-center items-center">
                <input
                    id="promotional-coupon-name"
                    type="text"
                    name="name"
                    placeholder="Nome do Cupom"
                    value={coupon.name}
                    onChange={(e) => handleChange(e)}
                    className="px-4 py-2 border rounded"
                />
                <input
                    id="coupon-value"
                    type="number"
                    placeholder="Valor"
                    name="value"
                    min="0"
                    max="100"
                    value={coupon.value}
                    onChange={(e) => handleChange(e)}
                    className="px-4 py-2 border rounded w-fit ml-4"
                />
                <button id="btn-adicionar-cupom" onClick={handleAddCoupon} className="px-4 py-2 bg-blue-500 text-white rounded ml-4">Adicionar Cupom</button>
            </div>
            <div className='flex justify-center'>
                <ul id="table-coupons" className="border rounded w-7/12">
                    <li className="flex justify-between items-center border-b py-2 px-4 font-bold">
                        <span className='w-2/4 mr-10'>Nome</span>
                        <span className='w-2/4 mr-10'>Porcentagem</span>
                        <span>Excluir</span>
                    </li>
                    {coupons.map((coupon, index) => (
                        <li key={coupon.id} className="flex justify-between items-center border-b py-2 px-4">
                            <span id={`coupon-name-${index}`} className='w-2/4 mr-10'>{coupon.name}</span>
                            <span id={`coupon-value-${index}`} className='w-2/4 mr-10'>{coupon.value}</span>
                            <button id={`btn-delete-coupon-${index}`} onClick={() => handleDeleteCoupon(coupon.id)} className="text-red-500">Excluir</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CouponList;
