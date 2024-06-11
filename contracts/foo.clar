(define-trait other-trait
  ((func1 (uint) (response uint uint)))
)

(define-public (foo (x <other-trait>))
  (contract-call? .bar foo x)
)