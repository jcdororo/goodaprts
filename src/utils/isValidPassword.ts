export function isValidatePassword(password: string) {
  // 조건 1: 최소 8자리 이상
  if (password.length < 8) {
    return false;
  }

  // 조건 2: 영어 대문자, 소문자, 숫자, 특수문자 중 3종류 이상 포함
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const countTypes = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
  if (countTypes < 3) {
    return false;
  }

  // 조건 3: 쉬운 문자열 포함 금지 (여기 예시로 '1234', 'password', 'qwert' 등을 검사)
  const easySequences = ["1234", "password", "qwert", "abcd", "0000", "1111"];
  for (let seq of easySequences) {
    if (password.includes(seq)) {
      return false;
    }
  }

  // 조건 4: 비밀번호에 아이디, 잘 알려진 단어, 키보드 상에서 나란히 있는 문자열이 포함되지 않도록 검사
  // 이 부분은 사용자에 따라 다를 수 있으므로, 구현할 때 컨텍스트에 맞게 조정해야 합니다.
  // 예: 'admin', 'username', 'qwerty'
  const forbiddenSequences = ["admin", "username", "qwerty", "asdf"];
  for (let seq of forbiddenSequences) {
    if (password.includes(seq)) {
      return false;
    }
  }

  return true; // 모든 검사를 통과했으면 true 반환
}
