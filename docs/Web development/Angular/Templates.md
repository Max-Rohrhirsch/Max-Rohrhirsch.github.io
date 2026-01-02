# Templates

## Routing
    
    
`<router-outlet></router-outlet>` in app.component.html schrieben

`<app-root></app-root>` in index.html

```tsx
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
    providers: [
    provideRouter(routes),
    provideHttpClient()
    ]
});
```

In Main.ts

```tsx
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'cart', component: CartComponent },
    { path: '**', redirectTo: '' }
];
```

in app.routes.ts
    
## Collection
- **Library im Monorepo anlegen**
    
    ```bash
    ng generate library shop-shared
    ```
    
    → Angular legt unter `projects/shop-shared/` deine Library an.
    
- **Wiederverwendbare Komponenten verschieben**
    - Alles, was nicht 100 % shop-spezifisch ist (Buttons, Header, Produktkarte, evtl. Pipes), in `projects/shop-shared/src/lib/` legen.
    - In `public-api.ts` exportieren.
- **Bauen**
    
    ```bash
    ng build shop-shared
    ```
    
- **Im Shop nutzen**
    
    Einfach in deinem Shop-Module importieren:
    
    ```tsx
    import { ShopSharedModule } from 'shop-shared';
    ```
    
- Linking auf PC
    
    ```bash
    cd dist/shop-shared
    npm link
    
    # in anderem Projekt
    npm link shop-frontend
    ```
    
- Allgemein nutzen
    
    ```bash
    npm adduser
    cd dist/shop-shared
    npm publish --access public
    ```
        
## Product page

```tsx
    constructor(private router: Router) {}

    goToProduct(id: number) {
    console.log('Navigating to product with ID:', id);
    this.router.navigate(['/products', id]);
    }
```

```tsx
// app.routes.ts
export const routes: Routes = [{ path: 'products/:id', component: ProductComponent }]
```

```tsx
// product.component.ts
    product: any;

    constructor(private route: ActivatedRoute, private http: HttpClient) {}

    ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`https://fakestoreapi.com/products/${id}`).subscribe(res => {
        this.product = res;
    });
    }
```
    
## Links von button
    
```tsx
<button class="btn-login" routerLink="/login">Login</button>
```
    
## better payment

```tsx
private initConfig(): void {
    const cartItems: Product[] = this.cartService.getItems();
    const total = cartItems.reduce((sum: number, item: Product) => sum + item.price * item.quantity, 0).toFixed(2);

    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'AU2DhNGr82J5yroY_NsyjU2RTKVAryT9aX6qv2sL33y-cYkXmQxWOY8XS7AUnXTVqQf_eiZsb5SqegjO',
    createOrderOnClient: () => ({
        intent: 'CAPTURE',
        purchase_units: [
        {
            amount: {
            currency_code: 'EUR',
            value: total,
            breakdown: {
                item_total: {
                currency_code: 'EUR',
                value: total
                }
            }
            },
            items: cartItems.map(item => ({
            name: item.title,
            quantity: item.quantity.toString(),
            category: 'PHYSICAL_GOODS',
            unit_amount: {
                currency_code: 'EUR',
                value: item.price.toFixed(2)
            }
            }))
        }
        ]
    }),
    advanced: {
        commit: 'true'
    },
    style: {
        label: 'paypal',
        layout: 'vertical'
    },
    onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
    },
    onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
    },
    onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
    },
    onError: err => {
        console.log('OnError', err);
    },
    onClick: (data, actions) => {
        console.log('onClick', data, actions);
    }
    };
}

```