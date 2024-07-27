export default function Stats({ items }) {
    if (!items.length) {
        return (
            <p className="stats">
                <em>Start Adding Some Items To Your Packing List 🚀</em>
            </p>
        );
    }
    //Derived State
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const packedPercent = Math.round((numPacked / numItems) * 100);

    return (
        <footer className="stats">
            {packedPercent === 100 ? ' You Got Everything! Ready to go ✈️'
                : <em>You have {`${numItems}`} items on your List , and you already packed {`${numPacked}`} ({`${packedPercent}%`})</em>}

        </footer>
    );
}
