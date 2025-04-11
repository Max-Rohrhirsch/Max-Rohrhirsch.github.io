# Encryption

## [Async] RSA
RSA is a widely used asymmetric encryption algorithm based on the mathematical problem of factoring large integers. It is used for secure data transmission and digital signatures.
Slow, but secure.

How it works:
- Two large prime numbers are chosen.
- These are multiplied to produce the modulus n.
- Public and private keys are generated based on this modulus.
- The public key is used to encrypt data, and the private key decrypts it.

<details>
  <summary>Code</summary>

```python
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
from Crypto.Random import get_random_bytes

# Generate RSA keys
key = RSA.generate(2048)
private_key = key.export_key()
public_key = key.publickey().export_key()

# Encrypt using public key
cipher = PKCS1_OAEP.new(RSA.import_key(public_key))
message = b"Hello, this is a secret message"
encrypted = cipher.encrypt(message)

# Decrypt using private key
cipher = PKCS1_OAEP.new(RSA.import_key(private_key))
decrypted = cipher.decrypt(encrypted)

print(f"Original: {message}")
print(f"Decrypted: {decrypted}")
```
</details>

## [Async] ECC
ECC is an asymmetric encryption system based on elliptic curves over finite fields. It is more efficient than RSA, providing the same level of security with shorter key sizes.
Fast and secure.

How it works:
- ECC works by leveraging the algebraic structure of elliptic curves to provide secure cryptographic systems.
- Common algorithms: ECDSA (Elliptic Curve Digital Signature Algorithm) and ECDH (Elliptic Curve Diffie-Hellman).

<details>
  <summary>Code</summary>

```python
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding

# Generate ECC private and public keys
private_key = ec.generate_private_key(ec.SECP384R1())
public_key = private_key.public_key()

# Sign a message
message = b"Hello, this is a secret message"
signature = private_key.sign(message, ec.ECDSA(hashes.SHA256()))

# Verify the signature
public_key.verify(signature, message, ec.ECDSA(hashes.SHA256()))

print("ECC Signature verified successfully.")
```
</details>

## [Sym] AES (Advanced Encryption Standard)
AES is a symmetric encryption algorithm used worldwide. It is fast, secure, and widely used in modern cryptography for encrypting data.
Fast and secure.

How it works:
- AES uses a substitution-permutation network (SPN) where data undergoes several rounds of transformation based on a key
- Key sizes: 128, 192, or 256 bits

<details>
  <summary>Code</summary>

```python
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

# Generate a random key and IV
key = get_random_bytes(16)  # AES-128 requires a 16-byte key
iv = get_random_bytes(16)

# Encrypt data
cipher = AES.new(key, AES.MODE_CBC, iv)
plaintext = b"Hello, AES encryption!"
ciphertext = cipher.encrypt(plaintext.ljust(32))  # Padding to 32 bytes

# Decrypt data
decipher = AES.new(key, AES.MODE_CBC, iv)
decrypted = decipher.decrypt(ciphertext).strip()

print(f"Original: {plaintext}")
print(f"Decrypted: {decrypted}")
```
</details>