import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { RootState } from '../store';
import { formatNumber, formatVNDate } from '../utils/formater';
import logo from '../assets/logo.png';
import { Bill } from '../types/bill.type';

interface PrintBuyBackInVoiceProps {
    isPrint: boolean;
    bill: Bill;
}

const PrintBuyBackInVoice = ({ isPrint, bill }: PrintBuyBackInVoiceProps) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const price = useSelector((state: RootState) => state.buyBack.price);
    useEffect(() => {
        if (isPrint) {
            handlePrint();
        }
    }, [isPrint]);

    return (
        <div className="w-full">
            {bill && (
                <div ref={componentRef}>
                    <div className="py-4">
                        <div className="px-14 py-6">
                            <table className="w-full border-collapse border-spacing-0">
                                <tbody>
                                    <tr>
                                        <td className="w-full align-top">
                                            <div>
                                                <img src={logo} className="h-16" alt="Logo" />
                                            </div>
                                        </td>
                                        <td className="align-top">
                                            <div className="text-sm">
                                                <table className="border-collapse border-spacing-0">
                                                    <tbody>
                                                        <tr>
                                                            <td className="border-r pr-4">
                                                                <div>
                                                                    <p className="whitespace-nowrap text-right text-slate-400">
                                                                        Date
                                                                    </p>
                                                                    <p className="text-main whitespace-nowrap text-right font-bold text-purple">
                                                                        {formatVNDate(
                                                                            new Date(bill.saleDate),
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                            <td className="pl-4">
                                                                <div>
                                                                    <p className="whitespace-nowrap text-right text-slate-400">
                                                                        Invoice #
                                                                    </p>
                                                                    <p className="text-main whitespace-nowrap text-right font-bold text-purple">
                                                                        {bill.billId}
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-slate-100 px-14 py-6 text-sm">
                            <table className="w-full border-collapse border-spacing-0">
                                <tbody>
                                    <tr>
                                        <td className="w-1/2 align-top">
                                            <div className="text-sm text-neutral-600">
                                                <p className="font-bold text-purple">
                                                    Liceria & Co.
                                                </p>
                                                <p>Số: 23456789</p>
                                                <p>VAT: 23456789</p>
                                                <p className="max-w-[200px] text-wrap">
                                                    Địa chỉ: 192 Đ. Man Thiện, Hiệp Phú, Quận 9, Hồ
                                                    Chí Minh, Việt Nam
                                                </p>
                                            </div>
                                        </td>
                                        <td className="w-1/2 text-right align-top">
                                            <div className="text-sm text-neutral-600">
                                                <p className="font-bold text-purple">Khách hàng</p>
                                                <p>Họ Tên: {bill.customerName}</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="px-14 py-10 text-sm text-neutral-700">
                            <table className="w-full border-collapse border-spacing-0">
                                <thead>
                                    <tr className="text-purple">
                                        <td className="border-main text-main border-b-2 pb-3 pl-3 font-bold">
                                            #
                                        </td>
                                        <td className="border-main text-main border-b-2 pb-3 pl-2 font-bold">
                                            Sản Phẩm
                                        </td>
                                        <td className="border-main text-main border-b-2 pb-3 pl-2 text-center font-bold">
                                            Mã
                                        </td>
                                        <td className="border-main text-main border-b-2 pb-3 pl-2 text-center font-bold">
                                            Giá
                                        </td>
                                        <td className="border-main text-main border-b-2 pb-3 pl-2 pr-3 text-right font-bold">
                                            Thành Tiền
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bill.items.map((item, index) => (
                                        <tr key={index}>
                                            <td className="border-b py-3 pl-3">{index + 1}</td>
                                            <td className="border-b py-3 pl-2">{item.name}</td>
                                            <td className="border-b py-3 pl-2 text-center">
                                                {item.jewelryId}
                                            </td>
                                            <td className="border-b py-3 pl-2 text-center">
                                                {formatNumber(item.totalPrice.toFixed(2)) + ' VND'}
                                            </td>
                                            <td className="border-b py-3 pl-2 pr-3 text-right">
                                                {formatNumber(item.totalPrice.toFixed(2)) + ' VND'}
                                            </td>
                                        </tr>
                                    ))}

                                    <tr>
                                        <td colSpan={7}>
                                            <table className="w-full border-collapse border-spacing-0">
                                                <tbody>
                                                    <tr>
                                                        <td className="w-full"></td>
                                                        <td>
                                                            <table className="w-full border-collapse border-spacing-0">
                                                                <tbody>
                                                                    <tr className="bg-purple">
                                                                        <td className="bg-main p-3">
                                                                            <div className="whitespace-nowrap font-bold text-white">
                                                                                Tổng tiền mua lại
                                                                            </div>
                                                                        </td>
                                                                        <td className="bg-main p-3 text-right">
                                                                            <div className="whitespace-nowrap font-bold text-white">
                                                                                {formatNumber(
                                                                                    price.toFixed(
                                                                                        2,
                                                                                    ),
                                                                                ) + ' VND'}
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <footer className="bg-slate-100 py-3 text-center text-xs text-[#525252]">
                            <div>© 2024 Liceria & Co. All rights reserved.</div>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrintBuyBackInVoice;
