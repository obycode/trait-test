(define-trait other-trait
  ((func1 (uint) (response uint uint)))
)

(define-trait bar-trait
  ((foo (<other-trait>) (response uint uint)))
)

(define-public (foo (x <other-trait>))
  (contract-call? .bar foo x)
)

;; meta-foo can take only implementations using trait foo.other-trait, not bar.token-trait
(define-public (meta-foo (bar <bar-trait>) (x <other-trait>))
  (contract-call? bar foo x)
)