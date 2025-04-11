# PayPal - Angular

### Installation

```bash
npm install ngx-paypal --save

ng generate component paypal-button --standalone
```
This only works with static rendering NOT on SSR!!! you also have to import <app-paypal-button></app-paypal-button> in the app.component.html

### Code for PayPal Button (PaypalButton.component.ts)

```typescript
import {IPayPalConfig, ICreateOrderRequest, NgxPayPalModule} from 'ngx-paypal';

@Component({
    selector: 'app-paypal-button',
    standalone: true,
    imports: [
        NgxPayPalModule
    ],
    templateUrl: './paypal-button.component.html',
    styleUrl: './paypal-button.component.scss'
})
export class PaypalButtonComponent implements OnInit {
    public payPalConfig?: IPayPalConfig;

    ngOnInit(): void {
        if (typeof window !== "undefined") {
            this.initConfig();
        }
    }

    private initConfig(): void {
        this.payPalConfig = {
            currency: 'EUR',
            clientId: 'AU2DhNGr82J5yroY_NsyjU2RTKVAryT9aX6qv2sL33y-cYkXmQxWOY8XS7AUnXTVqQf_eiZsb5SqegjO',
            createOrderOnClient: (data: any) => {
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'EUR',
                            value: '9.99',
                            breakdown: {
                                item_total: {
                                    currency_code: 'EUR',
                                    value: '9.99'
                                }
                            }
                        },
                        items: [
                            {
                                name: 'Enterprise Subscription',
                                quantity: '1',
                                category: 'DIGITAL_GOODS',
                                unit_amount: {
                                    currency_code: 'EUR',
                                    value: '9.99',
                                },
                            }
                        ]
                    }
                ]
            },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'vertical'
            },
            onApprove: (data, actions) => {
                console.log('onApprove - transaction was approved, but not authorized', data, actions);
                actions.order.get().then((details: any)=> {
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
        }
    }
}
```

### PaypalButton.component.html

```html
<ngx-paypal [config]="payPalConfig"></ngx-paypal>
```