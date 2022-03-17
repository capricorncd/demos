/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/03/06 21:36:48 (GMT+0900)
 * Binary tree traversal (preorder, inorder, subsequent)
 *
 * JavaScript二叉树算法
 * https://github.com/capricorncd/blog/blob/master/javascript/JavaScript%E4%BA%8C%E5%8F%89%E6%A0%91%E7%AE%97%E6%B3%95.md
 */

/**
 * node
 */
class Node<T> {
  public value: T;
  public left: null | Node<T>;
  public right: null | Node<T>;

  constructor(value: T) {
    // value
    this.value = value
    // left node
    this.left = null
    // right node
    this.right = null
  }
}

/**
 * binary tree
 */
class BinaryTree<T> {
  private root: null | Node<T>;

  constructor(nodes: T[]) {
    this.root = null
    nodes.forEach((item => {
      this.insert(item)
    }))
  }

  /**
   * insert value
   * @param value
   */
  insert(value: T): void {
    const node = new Node(value)
    if (this.root === null) {
      this.root = node
    } else {
      this.insertNode(this.root, node)
    }
  }

  /**
   * recursive insert node
   * @param node
   * @param newNode
   */
  insertNode(node: Node<T>, newNode: Node<T>): void {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  /**
   * recursive preorder traversal
   * @param node
   * @param callback
   * @private
   */
  _preorderTraversal<K>(node: Node<T> | null, callback: (value: T) => K) {
    if (node) {
      callback(node.value)
      this._preorderTraversal(node.left, callback)
      this._preorderTraversal(node.right, callback)
    }
  }

  /**
   * preorder traversal
   * @returns {*[]}
   */
  preorderTraversal(): T[] {
    const arr: T[] = []
    this._preorderTraversal(this.root, (value) => {
      arr.push(value)
    })
    return arr
  }

  /**
   * recursive inorder traversal
   * @param node
   * @param callback
   * @private
   */
  _inorderTraversal<K>(node: Node<T> | null, callback: (value: T) => K) {
    if (node) {
      this._inorderTraversal(node.left, callback)
      callback(node.value)
      this._inorderTraversal(node.right, callback)
    }
  }

  /**
   * inorder traversal
   * @returns {*[]}
   */
  inorderTraversal(): T[] {
    const arr: T[] = []
    this._inorderTraversal(this.root, (value) => {
      arr.push(value)
    })
    return arr
  }

  /**
   * recursive subsequent traversal
   * @param node
   * @param callback
   * @private
   */
  _subsequentTraversal<K>(node: Node<T> | null, callback: (value: T) => K) {
    if (node) {
      this._subsequentTraversal(node.left, callback)
      this._subsequentTraversal(node.right, callback)
      callback(node.value)
    }
  }

  /**
   * subsequent traversal
   * @returns {*[]}
   */
  subsequentTraversal(): T[] {
    const arr: T[] = []
    this._subsequentTraversal(this.root, (value) => {
      arr.push(value)
    })
    return arr
  }
}

export {
  BinaryTree
}
