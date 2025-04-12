import {useForm} from "react-hook-form";
import {useAuth} from "@/app/context/AuthProviderContext";
import {OrderDocument, OrderFormData} from "@/app/types/order";
import {Timestamp} from "firebase/firestore";

export type CheckoutFormValues = Omit<OrderFormData, 'status'> & {}

export const useCheckoutForm = () => {
    const {user} = useAuth();
    const formMethods = useForm<CheckoutFormValues>({
        defaultValues: {
            customer: {
                customer_name: "",
                customer_phone: "",
                customer_email: user?.email || "",
            },
            shippingAddress: {
                province: "",
                district: "",
                ward: "",
                street: "",
                fullAddress: "",
            },
            shippingMethod: "standard",
            paymentMethod: "COD",
            note: "",
        },
        mode: 'onBlur',
    });
    const {setValue} = formMethods;


    const updateAddressFields = (address: Partial<CheckoutFormValues['shippingAddress']>) => {
        Object.entries(address).forEach(([key, value]) => {
            //eslint-disable-next-line
            setValue(`shippingAddress.${key}` as any, value);
        });
    };
    const prepareOrderData = (
        formData: CheckoutFormValues,
        items: OrderDocument['items'],
        totalPrice: number,
    ): OrderDocument => {
        return {
            ...formData,
            items,
            totalPrice,
            createdAt: Timestamp.now(),
            status: 'pending',
            userId: user?.uid,
        }
    };
    return {
        ...formMethods,
        updateAddressFields,
        prepareOrderData,
    }
}