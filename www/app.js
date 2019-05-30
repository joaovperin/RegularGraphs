console.log('oi');
console.log (makePrimes(22));


function makePrimes(n){
   var primes = new Array(n).fill(true);
   // Takes primes
   for (let i=2; i <= n; i++){
      if (primes[i]){
         for (var j = i*2; j <= n; j+=i) primes[j] = false;
      }
   }
   // Convert the array
   return primes.reduce((carry, val, idx) => {
      if (val) carry.push(idx);
      return carry;
   } ,[]).slice(2);
}

