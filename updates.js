var updates = module.exports = exports = {};

updates.status_bak = function (doc, req) {
	
    var INTERESTING = 'status'; // Set me to the interesting field.

    var newDoc = JSON.parse(req.body);
    if(newDoc.hasOwnProperty(INTERESTING)) {
        // dollars was set (which includes 0, false, null, undefined
        // values. You might test for newDoc[INTERESTING] if those
        // values should not trigger this code.
        if((doc === null) || (doc[INTERESTING] !== newDoc[INTERESTING])) {
            // The field changed or created!
            newDoc.i_was_changed = true;
        }
    }

    if(!newDoc._id) {
        // A UUID generator would be better here.
        newDoc._id = req.id || Math.random().toString();
    }

    // Return the same JSON the vanilla Couch API does.
    return [newDoc, {json: {'id': newDoc._id}}];
};
updates.status = function (doc, req) {
    
    var status = req.query.status;
    //
    doc.status = status;
    return [doc, 'I changed status: ' + status];
};

