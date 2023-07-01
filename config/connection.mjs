/**
 * Base class for all database connection
 */
class Connection {
    // inject string connection
    constructor(strcon) {
        this.strcon = strcon
    }

    connect() {}
}

export default Connection;