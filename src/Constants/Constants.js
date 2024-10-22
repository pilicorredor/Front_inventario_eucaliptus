export const SERVICES = {
    LOGIN_SERVICE: 'http://localhost:8081/auth/login',
    GET_SELLERS_ALL_SERVICE: 'http://localhost:8082/person/sellers/all',
    GET_PROVIDERS_ALL_SERVICE: 'http://localhost:8082/person/providers/all',
    REGISTER_SELLER_SERVICE: "http://localhost:8082/person/sellers/addSeller",
    REGISTER_PROVIDER_SERVICE: "http://localhost:8082/person/providers/addProvider",
    GET_PROVIDER_BY_ID: "http://localhost:8082/person/providers/getProviderById",
    MODIFY_PROVIDER_SERVICE: "http://localhost:8082/person/providers/updateProvider",
    GET_SELLER_BY_ID: "http://localhost:8082/person/sellers/getSellerById",
    MODIFY_SELLER_SERVICE: "http://localhost:8082/person/sellers/updateSeller",
    DELETE_SELLER_SERVICE: "http://localhost:8082/person/sellers/deleteSeller",
    DELETE_PROVIDER_SERVICE: "http://localhost:8082/person/providers/deleteProvider",
}

export const MODAL_TYPES = {
    CONFIRMATION: 'CONFIRMATION',
    CHECK: 'CHECK',
    ERROR: 'ERROR'
};

export const ENTITIES = {
    PROVEEDOR: 'proveedor',
    VENDEDOR: 'vendedor',
    PRODUCTO: 'producto',
};

export const BUTTONS_ACTIONS = {
    REGISTRAR: 'registrar',
    MODIFICAR: 'modificar',
    ELIMINAR: 'eliminar',
}

export const ROLES = {
    ADMIN: 'ROLE_ADMIN',
    PROVIDER: 'ROLE_PROVIDER',
    SELLER: 'ROLE_SELLER',
    CLIENT: 'ROLE_CLIENT',
}

export const PERSON_TYPE = {
    NATURAL: 'NATURAL',
    LEGAL: 'JURIDICA',
}

export const DOCUMENT_TYPE = {
    CEDULA: 'CC',
    IMMIGRATION_CARD: 'CE',
    PASSPORT: 'PASS',
}