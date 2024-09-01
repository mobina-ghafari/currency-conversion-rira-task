//IMPORT
import { ChangeEvent, MouseEvent, useState } from "react";



//محاسبه تبدیل ارز
const convertCurrency = (amount:number , origin:string , destination:string):number =>{
    if(origin === "Dollar" && destination === "Rial"){
        return amount * 60000; //دلار به ریال
    }else if(origin === "Rial" && destination === "Dollar"){
        return amount / 60000; //ریال به دلار
    }else{
        return 0; //در غیر این صورت
    }
};

//فرمت کردن عدد 
const formatNumber = (num:number):string => num.toLocaleString();


const Main =()=>{
    //STATE
    const [selectedOrigin , setSelectedOrigin] = useState<string>('');
    const [selectedDestination , setSelectedDestination] = useState<string>('');
    const [search , setSearch] = useState<string>('');
    const [answer , setAnswer] = useState<number>(0); 

    //مدیریت مقدار ورودی 
    const handleSearch =(event:ChangeEvent<HTMLInputElement>)=>{
        const inputValue:string = event.target.value;
        //فقط اعداد
        if (/^\d*$/.test(inputValue)) { 
        setSearch(inputValue);
        }
    }

    //مدیریت دکمه محاسبه
    const handleClick =(event:MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        const amount:number = Number(search);
        const result:number = convertCurrency(amount , selectedOrigin , selectedDestination);
        setAnswer(result < 0 ? 0 : result);
    }

    return(
        <div dir="rtl" className="container-fluid">
            <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12 col-xs-12 mx-auto " style={{marginTop:"80px"}}>
                    <div className="my-form shadow">
                        <h1 className="text-primary">مبدل ارز</h1>
                        <form className="mt-4" action="">
                            <div className="">
                                <label className="ms-3 mt-2" htmlFor="amount">مبلغ مورد نظر برای تبدیل :</label>
                                <input onChange={handleSearch}  type="text" className="mt-2" id="amount" />
                            </div>
                            <div className="d-flex align-items-center justify-content-around mt-5">
                                <select onChange={(event)=>{setSelectedOrigin(event.target.value)}}  name="" id="">
                                    <option value=""  hidden>ارز مبدا</option>
                                    <option value="Dollar"> دلار</option>
                                    <option value="Rial">ریال</option>
                                </select>
                                <select onChange={(event)=>{setSelectedDestination(event.target.value)}}  name="" id="">
                                    <option value="" hidden>ارز مقصد</option>
                                    <option value="Rial">ریال</option>
                                    <option value="Dollar">دلار</option>
                                </select>
                            </div>
                            <button onClick={handleClick} type="submit" className="mt-5 btn btn-primary btn-lg">محاسبه</button>
                        </form>
                        <div className="d-flex align-items-center justify-content-center my-answer mt-2 py-5">مبلغ تبدیل شده : { <h1 className="me-3">{formatNumber(answer)}</h1>}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;