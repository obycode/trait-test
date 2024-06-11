(define-trait token-trait
  ((func1 (uint) (response uint uint)))
)

(define-public (foo (x <token-trait>))
  (contract-call? x func1 u1)
)