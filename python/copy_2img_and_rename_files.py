"""
copy the stable diffusion txt2img/img2img files to output_dir, 
and rename with reference_dir files name.
"""
import os
import re
import shutil

from typing import List, Tuple


class Copy2ImgError(Exception):
    """copy_2img_and_rename_files Exception"""


def copy_2img_and_rename_files(
    input_dir: str, reference_dir: str, output_dir: str, file_type: str = None
):
    """
    复制input_dir中的PNG文件到output_dir中，并按reference_dir中的文件一一对应重命名。
    @params input_dir 一般为txt2img/img2img批量生成的文件
    @params reference_dir 使用Ebsynth Utility生成的关键字文件夹，如video_key
    @params output_dir 输出文件夹，如img2img_key
    @params file_type 需要处理的文件类型，如png, jpg
    """
    if (
        not os.path.exists(input_dir)
        or not os.path.isdir(input_dir)
        or not os.path.exists(reference_dir)
        or not os.path.isdir(reference_dir)
    ):
        raise Copy2ImgError(
            f"{reference_dir} or {input_dir} folder does not exist or directory"
        )

    input_files: List[Tuple[int, str]] = get_file_list(input_dir, file_type)
    reference_file_names: List[Tuple[int, str]] = get_file_list(
        reference_dir, file_type
    )

    # sort
    sorted(input_files, key=lambda x: x[0])
    sorted(reference_file_names, key=lambda x: x[0])
    # print
    print(input_files)
    print(reference_file_names)

    if len(input_files) != len(reference_file_names):
        raise Copy2ImgError(
            "input_dir files and reference_dir files count are not equal"
        )

    if len(output_dir.strip()) > 0 and not os.path.exists(output_dir):
        # create directory
        os.makedirs(output_dir)
    elif not os.path.isdir(output_dir):
        raise Copy2ImgError(f"{output_dir} is not a directory")

    # rename
    for index, filename in enumerate(input_files):
        src_file_path = os.path.join(input_dir, filename[1])
        target_file_path = os.path.join(output_dir, reference_file_names[index][1])
        if os.path.exists(target_file_path):
            raise Copy2ImgError(f"{target_file_path} already exists")
        shutil.copy(src_file_path, target_file_path)

    print(f"{len(input_files)} files are copied")


def to_int(s: str) -> int:
    """str to int"""
    s = re.search(r"^(\d+).*", s)
    return int(s.group(1)) if s else 0


def get_file_list(input_dir: str, file_type: str = None):
    """get file list from input_dir"""
    # File extension
    ext = ".png" if file_type is None else f".{file_type}"

    file_list: List[Tuple[int, str]] = []
    for filename in os.listdir(input_dir):
        if filename.endswith(ext):
            file_list.append((to_int(filename), filename))

    return file_list


def main():
    """main"""
    try:
        copy_2img_and_rename_files(
            "input-dir",
            "reference-dir",
            "output-dir",
        )
    except Copy2ImgError as e:
        print(e)


if __name__ == "__main__":
    main()
