export type TStaking = {
    "version": "0.1.0",
    "name": "solana_staking",
    "instructions": [
        {
            "name": "initialize",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "configuration",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "addPlan",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "configuration",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "ix",
                    "type": {
                        "defined": "AddPlanIx"
                    }
                }
            ]
        },
        {
            "name": "stake",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "configuration",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "stake",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userTokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "ix",
                    "type": {
                        "defined": "StakeIx"
                    }
                }
            ]
        },
        {
            "name": "unstake",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "configuration",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "stake",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userTokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "ix",
                    "type": {
                        "defined": "UnstakeIx"
                    }
                }
            ]
        },
        {
            "name": "deposit",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "configuration",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userTokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "ix",
                    "type": {
                        "defined": "DepositIx"
                    }
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "configuration",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "bump",
                        "type": "u8"
                    },
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "tokenMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "plans",
                        "type": {
                            "vec": {
                                "defined": "Plan"
                            }
                        }
                    },
                    {
                        "name": "total",
                        "type": "u64"
                    },
                    {
                        "name": "reserved",
                        "type": {
                            "array": [
                                "u128",
                                5
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "stake",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "bump",
                        "type": "u8"
                    },
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "stakeId",
                        "type": "u64"
                    },
                    {
                        "name": "planIndex",
                        "type": "u8"
                    },
                    {
                        "name": "stakedAt",
                        "type": "u64"
                    },
                    {
                        "name": "amount",
                        "type": "u64"
                    },
                    {
                        "name": "reserved",
                        "type": {
                            "array": [
                                "u128",
                                1
                            ]
                        }
                    }
                ]
            }
        }
    ],
    "types": [
        {
            "name": "AddPlanIx",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "period",
                        "type": "u64"
                    },
                    {
                        "name": "reward",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "DepositIx",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "amount",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "StakeIx",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "stakeId",
                        "type": "u64"
                    },
                    {
                        "name": "planIndex",
                        "type": "u8"
                    },
                    {
                        "name": "amount",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "UnstakeIx",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "stakeId",
                        "type": "u64"
                    },
                    {
                        "name": "planIndex",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "Plan",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "period",
                        "type": "u64"
                    },
                    {
                        "name": "reward",
                        "type": "u64"
                    },
                    {
                        "name": "parcitipants",
                        "type": "u8"
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "CalcError",
            "msg": "Calculation Error."
        },
        {
            "code": 6001,
            "name": "InvalidAddress",
            "msg": "Invalid address."
        },
        {
            "code": 6002,
            "name": "InvalidAuthority",
            "msg": "Invalid authority."
        },
        {
            "code": 6003,
            "name": "InvalidToken",
            "msg": "Invalid token."
        },
        {
            "code": 6004,
            "name": "InvalidPlanIndex",
            "msg": "Invalid plan index."
        },
        {
            "code": 6005,
            "name": "PlanLimitExceed",
            "msg": "Plan Limit exceeded."
        },
        {
            "code": 6006,
            "name": "InvalidUnstake",
            "msg": "Invalid unstake."
        }
    ]
};

export const IDL: TStaking = {
    "version": "0.1.0",
    "name": "solana_staking",
    "instructions": [
        {
            "name": "initialize",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "configuration",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "addPlan",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "configuration",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "ix",
                    "type": {
                        "defined": "AddPlanIx"
                    }
                }
            ]
        },
        {
            "name": "stake",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "configuration",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "stake",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userTokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "ix",
                    "type": {
                        "defined": "StakeIx"
                    }
                }
            ]
        },
        {
            "name": "unstake",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "configuration",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "stake",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userTokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "ix",
                    "type": {
                        "defined": "UnstakeIx"
                    }
                }
            ]
        },
        {
            "name": "deposit",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "configuration",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userTokenVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "ix",
                    "type": {
                        "defined": "DepositIx"
                    }
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "configuration",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "bump",
                        "type": "u8"
                    },
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "tokenMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "plans",
                        "type": {
                            "vec": {
                                "defined": "Plan"
                            }
                        }
                    },
                    {
                        "name": "total",
                        "type": "u64"
                    },
                    {
                        "name": "reserved",
                        "type": {
                            "array": [
                                "u128",
                                5
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "stake",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "bump",
                        "type": "u8"
                    },
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "stakeId",
                        "type": "u64"
                    },
                    {
                        "name": "planIndex",
                        "type": "u8"
                    },
                    {
                        "name": "stakedAt",
                        "type": "u64"
                    },
                    {
                        "name": "amount",
                        "type": "u64"
                    },
                    {
                        "name": "reserved",
                        "type": {
                            "array": [
                                "u128",
                                1
                            ]
                        }
                    }
                ]
            }
        }
    ],
    "types": [
        {
            "name": "AddPlanIx",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "period",
                        "type": "u64"
                    },
                    {
                        "name": "reward",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "DepositIx",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "amount",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "StakeIx",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "stakeId",
                        "type": "u64"
                    },
                    {
                        "name": "planIndex",
                        "type": "u8"
                    },
                    {
                        "name": "amount",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "UnstakeIx",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "stakeId",
                        "type": "u64"
                    },
                    {
                        "name": "planIndex",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "Plan",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "period",
                        "type": "u64"
                    },
                    {
                        "name": "reward",
                        "type": "u64"
                    },
                    {
                        "name": "parcitipants",
                        "type": "u8"
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "CalcError",
            "msg": "Calculation Error."
        },
        {
            "code": 6001,
            "name": "InvalidAddress",
            "msg": "Invalid address."
        },
        {
            "code": 6002,
            "name": "InvalidAuthority",
            "msg": "Invalid authority."
        },
        {
            "code": 6003,
            "name": "InvalidToken",
            "msg": "Invalid token."
        },
        {
            "code": 6004,
            "name": "InvalidPlanIndex",
            "msg": "Invalid plan index."
        },
        {
            "code": 6005,
            "name": "PlanLimitExceed",
            "msg": "Plan Limit exceeded."
        },
        {
            "code": 6006,
            "name": "InvalidUnstake",
            "msg": "Invalid unstake."
        }
    ]
};
