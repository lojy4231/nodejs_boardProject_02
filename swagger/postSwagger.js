/**
 * @swagger
 *  /api/post:
 *    get:
 *      tags:
 *      - post
 *      description: 모든 게시글 조회
 *      responses:
 *        "200":
 *          description: successful operation
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                example:
 *                  postNum: 10001
 *                  title: "타이틀"
 *                  userId : "유저아이디"
 *                  date: "yyyy-mm-dd"
 * 
 */

/**
 * @swagger
 *  /api/post/{postNum}:
 *    get:
 *      tags:
 *      - post
 *      description: 게시글 상세보기
 *      parameters:
 *        - in : path
 *          name: postNum
 *          description: 게시글 상세보기
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        "200":
 *          description: successful operation
 *          content:
 *            application/json:
 *              schema:
 *                  example:
 *                    postNum: 10001
 *                    title: "타이틀"
 *                    userId : "유저아이디"
 *                    date: "yyyy-mm-dd"
 *                    content: "테스트입니다."
 *        "400":
 *          description: post can not be found
 */

/**
 * @swagger
 *  /api/post:
 *    post:
 *      tags:
 *      - post
 *      description: 게시글 작성
 *      parameters:
 *        - in : header
 *          name: authorization
 *          type : string
 *          description: jwt 토큰
 *        - in : body
 *          name: body
 *          description: 게시글 작성
 *          schema:
 *            type: object
 *            example:
 *              title: "타이틀"
 *              content: "테스트입니다."
 *      responses:
 *        "200":
 *          description: successful operation
 *          content:
 *            application/json:
 *              schema:
 *                  example:
 *                    title: "타이틀"
 *                    content: "테스트입니다."
 *        "400":
 *          description: post can not be found
 */

/**
 * @swagger
 *  /api/post/{postNum}:
 *    put:
 *      tags:
 *      - post
 *      description: 게시글 작성
 *      parameters:
 *        - in : header
 *          name: authorization
 *          type : string
 *          description: jwt 토큰
 *        - in : path
 *          name: postNum
 *        - in : body
 *          name: body
 *          description: 게시글 작성
 *          schema:
 *            type: object
 *            example:
 *              title: "타이틀"
 *              content: "테스트입니다."        
 *      responses:
 *        "200":
 *          description: successful operation
 *          content:
 *            application/json:
 *              schema:
 *                  example:
 *                    title: "타이틀"
 *                    content: "테스트입니다."
 *        "400":
 *          description: post can not be found
 */

/**
 * @swagger
 *  /api/post/{postNum}:
 *    delete:
 *      tags:
 *      - post
 *      description: 게시글 작성
 *      parameters:
 *        - in : header
 *          name: authorization
 *          type : string
 *          description: jwt 토큰
 *        - in : path
 *          name: postNum
 *      responses:
 *        "200":
 *          description: successful operation
 *          content:
 *            application/json:
 *        "400":
 *          description: post can not be found
 */