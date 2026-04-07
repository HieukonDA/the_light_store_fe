import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import API from "../../core/constants/paths";
import { Product } from "../interfaces/product.interface";
import { ResponseRecord } from "../interfaces/common.interface";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private http = inject(HttpClient);

    getFlashSaleProducts(): Observable<ResponseRecord<Product[]>> {

        return this.http.get<ResponseRecord<Product[]>>(
            API.API_PRODUCT_GET_FLASH_SALE
        );
    }
}