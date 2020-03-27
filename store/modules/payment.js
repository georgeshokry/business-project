import axios from 'axios';

export default{
    state: {
        dbFormData: null,
        firstFormFlag: null,
        secondFormFlag: null,
        checkOutPaymentFlag: null,
        pricingPlans: null
    },
    mutations: {
         setDbFormData(state, payload){
             state.dbFormData = payload;
         },
        setFirstFormFlag(state, payload){
             state.firstFormFlag = payload;
         },
        setSecondFormFlag(state, payload){
             state.secondFormFlag = payload;
        },
        setcheckOutPaymentFlag(state, payload){
             state.checkOutPaymentFlag = payload;
        },
        setPricingPlans(state, payload){
             state.pricingPlans = payload;
        }
    },
    actions: {
        dbFormData({commit}, payload){
            commit('setDbFormData', null);
            commit('setFirstFormFlag', null);
            axios.post('/vue/paymentSecureData').then(resp => {
                commit('setFirstFormFlag', resp.data.status);
                commit('setDbFormData', resp.data.params)
            });
        },
        submitFirstPaymentForm({commit}, payload){
            commit('setSecondFormFlag', null);
            axios.post('/vue/checkUnsigneddatafields', payload.firstDataForm).then(resp=>{
                commit('setSecondFormFlag', resp);
            }).catch((error)=>{
                commit('setSecondFormFlag', "ERROR");
            });
        },
        checkOutPayment({commit}, payload){

            let fd= new FormData();
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'content-type or other'

                }
            };

            fd.append('access_key', payload.checkout.access_key);
            fd.append('profile_id', payload.checkout.profile_id);
            fd.append('transaction_uuid', payload.checkout.transaction_uuid);
            fd.append('signed_field_names', payload.checkout.signed_field_names);
            fd.append('unsigned_field_names', payload.checkout.unsigned_field_names);
            fd.append('signed_date_time', payload.checkout.signed_date_time);
            fd.append('locale', payload.checkout.locale);
            fd.append('merchant_defined_data1', payload.checkout.merchant_defined_data1);
            fd.append('merchant_defined_data2', payload.checkout.merchant_defined_data2);
            fd.append('merchant_defined_data4', payload.checkout.merchant_defined_data4);
            fd.append('merchant_defined_data5', payload.checkout.merchant_defined_data5);
            fd.append('merchant_defined_data7', payload.checkout.merchant_defined_data7);
            fd.append('merchant_defined_data20', payload.checkout.merchant_defined_data20);
            fd.append('transaction_type', payload.checkout.transaction_type);
            fd.append('reference_number', payload.checkout.reference_number);
            fd.append('amount', payload.checkout.amount);
            fd.append('currency', payload.checkout.currency);
            fd.append('payment_method', payload.checkout.payment_method);
            fd.append('bill_to_forename', payload.checkout.bill_to_forename);
            fd.append('bill_to_surname', payload.checkout.bill_to_surname);
            fd.append('bill_to_email', payload.checkout.bill_to_email);
            fd.append('bill_to_phone', payload.checkout.bill_to_phone);
            fd.append('bill_to_address_line1', payload.checkout.bill_to_address_line1);
            fd.append('bill_to_address_city', payload.checkout.bill_to_address_city);
            fd.append('bill_to_address_state', payload.checkout.bill_to_address_state);
            fd.append('bill_to_address_country', payload.checkout.bill_to_address_country);
            fd.append('bill_to_address_postal_code', payload.checkout.bill_to_address_postal_code);
            fd.append('bill_to_ip_address', payload.checkout.bill_to_ip_address);
            fd.append('customer_ip_address', payload.checkout.customer_ip_address);
            fd.append('card_type', payload.checkout.card_type);
            fd.append('card_number', payload.checkout.card_number);
            fd.append('card_expiry_date', payload.checkout.card_expiry_date);

            axios.post('https://secureacceptance.cybersource.com/pay', fd,config).then(res=>{
                console.log(res);
            }).catch((error)=>{
                console.log(error);
            })
        },
        allPricingPlan({commit}, payload){
            commit('setPricingPlans', null);
            axios.post('/vue/businessPlans').then((resp)=>{
                commit('setPricingPlans', resp.data);
            }).catch((error)=>{

            });
        }
    },
    getters: {
        getDbFormData:(state)=>{
            return state.dbFormData;
        },
        getFirstFormFlag:(state)=>{
            return state.firstFormFlag;
        },
        getSecondFormFlag: (state)=>{
            return state.secondFormFlag;
        },
        getcheckOutPaymentFlag: (state)=>{
            return state.checkOutPaymentFlag;
        },
        getPricingPlans: (state)=>{
            return state.pricingPlans;
        }
    }
}
