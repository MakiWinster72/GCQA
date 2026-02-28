/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package encryption

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"os"
	"strings"
)

const (
	secretInfoKeyEnvName = "GCQA_SECRET_INFO_KEY"
	defaultSecretInfoKey = "gcqa-secret-info-default-key-change-me"
)

func secretInfoCipher() (cipher.AEAD, error) {
	secret := strings.TrimSpace(os.Getenv(secretInfoKeyEnvName))
	if secret == "" {
		secret = defaultSecretInfoKey
	}
	key := sha256.Sum256([]byte(secret))
	block, err := aes.NewCipher(key[:])
	if err != nil {
		return nil, err
	}
	return cipher.NewGCM(block)
}

// Encrypt encrypts plain text and encodes it in base64.
func Encrypt(plainText string) (string, error) {
	gcm, err := secretInfoCipher()
	if err != nil {
		return "", err
	}
	nonce := make([]byte, gcm.NonceSize())
	if _, err = rand.Read(nonce); err != nil {
		return "", err
	}
	cipherText := gcm.Seal(nonce, nonce, []byte(plainText), nil)
	return base64.RawStdEncoding.EncodeToString(cipherText), nil
}

// Decrypt decrypts base64 encoded cipher text.
func Decrypt(cipherText string) (string, error) {
	gcm, err := secretInfoCipher()
	if err != nil {
		return "", err
	}
	raw, err := base64.RawStdEncoding.DecodeString(cipherText)
	if err != nil {
		return "", err
	}
	nonceSize := gcm.NonceSize()
	if len(raw) < nonceSize {
		return "", fmt.Errorf("cipher text too short")
	}
	nonce, data := raw[:nonceSize], raw[nonceSize:]
	plainText, err := gcm.Open(nil, nonce, data, nil)
	if err != nil {
		return "", err
	}
	return string(plainText), nil
}
