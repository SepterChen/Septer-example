//
//  ViewController.m
//  PageViewDemo
//
//  Created by 陈良 on 16/4/7.
//  Copyright © 2016年 陈良. All rights reserved.
//

#import "ViewController.h"
#define MAIN_SCREEN_WIDTH [UIScreen mainScreen].bounds.size.width
#define MAIN_SCREEN_HEIGHT [UIScreen mainScreen].bounds.size.height
CGFloat pageCtrollWidth = 200;
CGFloat pageCount = 10;



@interface ViewController ()
@property (nonatomic,strong) UIScrollView *scrollView;
@property (nonatomic,strong) UIPageControl *controll;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    [self initScrollView];
    [self initPageControll];
    self.navigationItem.title = @"图片浏览器";
    
}

#pragma 初始化是scrollView
-(void)initScrollView{
    _scrollView = [[UIScrollView alloc] initWithFrame:CGRectMake(0, 0, MAIN_SCREEN_WIDTH, MAIN_SCREEN_HEIGHT)];
    _scrollView.delegate = self;
    for (int i = 0; i < pageCount; i ++) {
        UIImageView *imageView = [[UIImageView alloc] initWithFrame:CGRectMake(MAIN_SCREEN_WIDTH * i, 0, MAIN_SCREEN_WIDTH, MAIN_SCREEN_HEIGHT)];
        
        imageView.image = [UIImage imageNamed:[NSString stringWithFormat:@"%d",i + 1]];
        [self addGestureToView:imageView];
        imageView.tag = i + 1;
        [imageView setMultipleTouchEnabled: YES];
        [imageView setUserInteractionEnabled:YES];
        [_scrollView addSubview:imageView];
    }
    _scrollView.contentSize = CGSizeMake(MAIN_SCREEN_WIDTH * pageCount, MAIN_SCREEN_HEIGHT);
    _scrollView.pagingEnabled = YES;
    [self.view addSubview:_scrollView];
    
}

#pragma 初始化pagerController
-(void)initPageControll{
    _controll = [[UIPageControl alloc] initWithFrame:CGRectMake((MAIN_SCREEN_WIDTH - pageCtrollWidth)/2, MAIN_SCREEN_HEIGHT - 20, pageCtrollWidth, 20)];
    _controll.numberOfPages = pageCount;
    _controll.pageIndicatorTintColor = [UIColor greenColor];
    _controll.currentPageIndicatorTintColor = [UIColor redColor];
    [self.view insertSubview:_controll aboveSubview:_scrollView];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)scrollViewDidScroll:(UIScrollView *)scrollView{
    NSInteger page = scrollView.contentOffset.x / MAIN_SCREEN_WIDTH + 0.5;
    _controll.currentPage = page;
}

#pragma  mark - 添加手势
-(void)addGestureToView:(UIView *)view{
    //点击
    UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(doTapGesture:)];
    tap.numberOfTapsRequired = 1;//点击次数(双击/单击)
    [view addGestureRecognizer:tap];
    //添加手势操作
    
}

-(void)doTapGesture:(UITapGestureRecognizer *) tapGesture{
    NSInteger n = ((UIImageView *)tapGesture.view).tag;
    NSLog(@"你点击了第%ld张图片",(long)n);
}

@end
