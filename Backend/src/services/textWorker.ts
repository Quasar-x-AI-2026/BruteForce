export async function runTextWorker(): Promise<{
  title: string
  description: string
  price: string
}> {
  return {
    title: "Handcrafted Product",
    description: "A beautifully handmade product crafted with care.",
    price: "₹1200 – ₹1500"
  }
}
