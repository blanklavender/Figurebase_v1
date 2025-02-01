// Directing user to stripe payment portal

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const MY_DOMAIN = "http://localhost:3000"

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { name, email } = req.body;

        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ['card'],
            // customer_email: email,
            line_items: [
                {
                    // price_data: {
                    //     currency: 'usd',
                    //     product_data: {
                    //         name: 'Figure Base Subscription',
                    //     },  
                    //     unit_amount: 1000, // $10.00 in cents
                    // },
                    // quantity: 1,
                    price:'price_1QnYROCAeeXcFQDdZlwtCtpL',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url:`${MY_DOMAIN}/success.html`,
            cancel_url:`${MY_DOMAIN}/cancel.html`,
            automatic_tax: {enabled: true},
        });

        console.log("Session ID: ", session.id)
        res.redirect(303, session.url);
        // res.status(200).json({ id: session.id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
