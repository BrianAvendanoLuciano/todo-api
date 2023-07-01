import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app.mjs'
let should = chai.should();
chai.use(chaiHttp);

/**
 * Test all Todo endpoints
 */
describe('Todo', () => {
    before( done => {
        app.on( "app_started", () => {
            done()
        })
    })
        
    /*
    * Test the /GET route
    */
    describe('/GET ', () => {
        it('it should GET all todo', (done) => {
        chai.request(app)
            .get('/api/v1/todo')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done()
            });
        });
    });

    /*
    * Test the /GET route
    * test pagination
    */
    describe('/GET ', () => {
        it('it should GET all todo', (done) => {
        chai.request(app)
            .get('/api/v1/todo/?limit=1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done()
            });
        });
    });

    /*
    * Test the /POST route
    * no body
    */
    describe('/POST ', () => {
        it('it should create a new todo', (done) => {
        chai.request(app)
            .post('/api/v1/todo')
            .end((err, res) => {
                res.should.have.status(200);
                done()
            });
        });
    });

     /*
    * Test the /PATCH route
    * id does not exists
    */
     describe('/PATCH ', () => {
        it('it should create a new todo', (done) => {
        chai.request(app)
            .post('/api/v1/todo')
            .field({
                id: 'test'
            })
            .end((err, res) => {
                res.should.have.status(200);
                done()
            });
        });
    });

     /*
    * Test the /DELETE route
    * id does not exists
    */
     describe('/DELETE ', () => {
        it('it should create a new todo', (done) => {
        chai.request(app)
            .post('/api/v1/todo')
            .field({
                title: 'test'
            })
            .end((err, res) => {
                res.should.have.status(200);
                done()
            });
        });
    });
    
    });
