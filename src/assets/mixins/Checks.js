import api from '../../api/api.js';

export default {
  data: () => ({
    keyword_count: null,
    keyword_check: false,
    keyword_check_result: '',

    twitter_account: '',
    twitter_account_id: null,
    twitter_account_response: null,
    twitter_account_check: false,
    twitter_account_result: null,

    tweet_url: '',
    tweet_id: null,
    tweet_url_response: null,
    tweet_url_check: false,
    tweet_url_result: null,
  }),
  methods: {
    checkKeywordPromise() {
      return new Promise((resolve) => {
        api
          .checkKeyword({
            keyword: this.keyword,
          })
          .then((response) => {
            this.keyword_count = response.data;
            if (this.keyword_count < 5000) {
              this.keyword_check = true;
              this.keyword_check_result = `指定されたキーワードの直近７日間の利用数は${
                String(this.keyword_count)
              }回であり、利用可能です。`;
            } else {
              this.keyword_check = false;
              this.keyword_check_result = `指定されたキーワードの直近７日間の利用数は${
                String(this.keyword_count)
              }回であり、利用数が多すぎます。別のキーワードをご利用ください`;
            }
            resolve('resolved');
          })
          .catch((error) => {
            this.$toast.show('キーワードのチェックに失敗しました', {
              type: 'error',
              position: 'top-right',
              duration: 5000,
            });
            console.log('error: ', error);
            resolve('rejected');
          });
      });
    },
    checkTwitterAccountPromise() {
      return new Promise((resolve) => {
        api
          .checkTwitterAccount({
            username: this.twitter_account,
          })
          .then((response) => {
            this.twitter_account_response = response.data;
            if (this.twitter_account_response != 'NotFound') {
              this.twitter_account_check = true;
              this.twitter_account_id = this.twitter_account_response.id;
              this.twitter_account_result = `${String(this.twitter_account_response.username)
              } : ${
                String(this.twitter_account_response.description)}`;
            } else {
              this.twitter_account_check = false;
              this.twitter_account_result = '入力いただいたusernameのアカウントは見つかりませんでした。';
            }
            resolve('resolve');
          })
          .catch((error) => {
            this.$toast.show('アカウントチェックに失敗しました', {
              type: 'error',
              position: 'top-right',
              duration: 5000,
            });
            console.log('error: ', error);
            resolve('reject');
          });
      });
    },
    checkTweetPromise() {
      return new Promise((resolve) => {
        api
          .checkTweet({
            tweet_url: this.tweet_url,
          })
          .then((response) => {
            this.tweet_url_response = response.data;
            if (this.tweet_url_response != 'NotFound') {
              this.tweet_url_check = true;
              this.tweet_id = this.tweet_url_response.data.id;
              this.tweet_url_result = `${String(
                this.tweet_url_response.includes.users[0].username,
              )
              } : ${
                String(this.tweet_url_response.data.text)}`;
            } else {
              this.tweet_url_check = false;
              this.tweet_url_result = '入力いただいたtweetは見つかりませんでした。';
            }
            resolve('resolve');
          })
          .catch((error) => {
            this.$toast.show('ツイートチェックに失敗しました', {
              type: 'error',
              position: 'top-right',
              duration: 5000,
            });
            console.log('error: ', error);
            resolve('reject');
          });
      });
    },
  },
};
