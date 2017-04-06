var fortuneCookies = [
    'Conquer your fears or they will conquer you.',
    'Rivers need springs.',
    'Do not fear what you don\'t know.',
    'You will have a pleasant surprise.',
    'Whenever possible, keep it simple.',
];

// global variable exports, this lets getFortune be visible outside of the module
// fortuneCookies will remain completely hidden
exports.getFortune = () => {
    var idx = Math.floor(Math.random() * fortuneCookies.length);
    return fortuneCookies[idx];
};