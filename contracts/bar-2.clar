(use-trait token-trait .foo.other-trait )

(define-public (foo (x <token-trait>))
  (contract-call? .bar foo x)
)