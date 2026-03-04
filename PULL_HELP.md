# git pull 문제 해결 가이드

현재 저장소에서 `git pull`이 실패하는 가장 흔한 원인은 아래 2가지입니다.

1. 원격 저장소(`origin`)가 등록되지 않음
2. 현재 브랜치에 upstream(추적 브랜치)이 설정되지 않음

## 1) 원격 저장소 등록

```bash
git remote add origin <REPOSITORY_URL>
```

예시:

```bash
git remote add origin https://github.com/<user>/<repo>.git
```

등록 확인:

```bash
git remote -v
```

## 2) 원격 브랜치 정보 가져오기

```bash
git fetch origin
```

## 3) 현재 브랜치(`work`)의 upstream 설정

원격 기본 브랜치가 `main`인 경우:

```bash
git branch --set-upstream-to=origin/main work
```

원격 기본 브랜치가 `master`인 경우:

```bash
git branch --set-upstream-to=origin/master work
```

## 4) pull 실행

```bash
git pull
```

---

## 한 번에 가져오는 임시 방법

upstream 설정 전이라도 아래처럼 실행할 수 있습니다.

```bash
git pull origin main
```

(원격 브랜치가 `master`면 `main` 대신 `master`)

---

## 충돌 또는 인증 오류가 날 때

- 로컬 변경 임시 보관
  ```bash
  git stash
  git pull
  git stash pop
  ```

- 인증 실패 시
  - HTTPS: Personal Access Token 사용
  - SSH: `ssh-keygen`, 공개키 등록 후 `git@github.com:...` URL 사용
