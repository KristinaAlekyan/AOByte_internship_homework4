class MyCustomPromise {
    constructor(handler) {
        this.status = "pending";
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = value => {
            if (this.status === "pending") {
                this.status = "fulfilled";
                this.value = value;
                this.onFulfilledCallbacks.forEach(fn => fn(value));
            }
        };

        const reject = value => {
            if (this.status === "pending") {
                this.status = "rejected";
                this.value = value;
                this.onRejectedCallbacks.forEach(fn => fn(value));
            }
        };

        try {
            handler(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(onFulfilled, onRejected) {
        return new MyCustomPromise((resolve, reject) => {
            if (this.status === "pending") {
                this.onFulfilledCallbacks.push(() => {
                    try {
                        const fulfilledFromLastPromise = onFulfilled(this.value);
                        if (fulfilledFromLastPromise instanceof MyCustomPromise) {
                            fulfilledFromLastPromise.then(resolve, reject);
                        } else {
                            resolve(fulfilledFromLastPromise);
                        }
                    } catch (err) {
                        reject(err);
                    }
                });
                this.onRejectedCallbacks.push(() => {
                    try {
                        const rejectedFromLastPromise = onRejected(this.value);
                        if (rejectedFromLastPromise instanceof MyCustomPromise) {
                            rejectedFromLastPromise.then(resolve, reject);
                        } else {
                            reject(rejectedFromLastPromise);
                        }
                    } catch (err) {
                        reject(err);
                    }
                });
            }

            if (this.status === "fulfilled") {
                try {
                    const fulfilledFromLastPromise = onFulfilled(this.value);
                    if (fulfilledFromLastPromise instanceof MyCustomPromise) {
                        fulfilledFromLastPromise.then(resolve, reject);
                    } else {
                        resolve(fulfilledFromLastPromise);
                    }
                } catch (err) {
                    reject(err);
                }

            }

            if (this.status === "rejected") {
                try {
                    const rejectedFromLastPromise = onRejected(this.value);
                    if (rejectedFromLastPromise instanceof MyCustomPromise) {
                        rejectedFromLastPromise.then(resolve, reject);
                    } else {
                        reject(rejectedFromLastPromise);
                    }
                } catch (err) {
                    reject(err);
                }
            }
        });

    }
}


// let p = new MyCustomPromise((resolve, reject) => {
//     setTimeout(() => resolve('resolved first one'), 5000);
// });
// p.then((res) => {
//     console.log(res);
//     return new MyCustomPromise(resolve => {
//         setTimeout(() => resolve('resolved second one'), 1000);
//     });
// }).then(res => {
//     console.log(res);
// });



function ajax(url, config) {    
    return new MyCustomPromise((resolve, reject) => {     
        let request = new XMLHttpRequest();   
        request.open(config.type, url);
        request.onload = function() {
            if (request.status === 200) {
                resolve(request.response)
            } else {
                reject('error')
            }
        }
        request.onerror = function(e) {
            reject(e)
        }
        request.send();
    })
}



const p1 = ajax('https://dog.ceo/api/breeds/image/random', {
    type: "GET",
    headers: {},
    data: {}
}).then((res) => {
        console.log(res);
        return new MyCustomPromise(resolve => {
            setTimeout(() => resolve('resolved first time'), 5000);
    });
}).then(res => {
         console.log("res", res);
});
  

  


