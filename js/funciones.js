function verProducto(id){
    localStorage.setItem("producto", JSON.stringify(id));
}

function cargarProducto(){
    let id = JSON.parse(localStorage.getItem("producto"));
    const producto = productos.find(item => item.id == id);
    return producto;
}