exports.install = function() {
	F.route('/', view_index)
	F.route('/services/{name}/', view_services)
    F.route('/contact/', view_contact)
    F.route('/contact/', json_contanct, ['post'])
    F.route('/vloz/{name}/', view_vloz)
};

function view_index() {
	var self = this
	self.view('index')
}

function view_services(name) {
    var self = this;
    // The "services" view is routed into the views/services.html
    // A second argument is the model
    // ---> Send the response
    self.view('services', { category: name });
}

function view_contact() {
    var self = this;
    // "contact" view is routed to views/contact.html
    // ---> Send the response
    self.view('contact');
}

function json_contact() {
    var self = this;
    
    // get the data from the request body
    // the data are parsed into the object automatically
    var model = self.body

    // e.g.
    // model.email
    // model.name

    //send the email to our company
    var message = self.mail('info@company.com', 'Contact form', 'mail-template', model)
    message.reply(model.email)

    //send the response in json format
    self.json({success: true})
}

