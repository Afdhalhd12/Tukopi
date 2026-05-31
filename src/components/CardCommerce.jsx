export default function CardCommerce({ product }) {
    return (
        <div className="mt-5">
            <div className="bg-white rounded-2xl border border-[#E5E5E5]">
                <div className="flex justify-center">
                    <img src={product.image} className="" />
                </div>
            </div>
            <div className="flex justify-between mt-2">
                <p className="font-inter font-semibold">{product.name}</p>
                <p className="font-inter font-bold">Rp. {product.price.toLocaleString('id-ID')}</p>
            </div>
            <div>
                <p className="text-sm font-inter">{product.category}</p>
            </div>

        </div>
    )
}